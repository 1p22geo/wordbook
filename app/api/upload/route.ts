import * as dateFn from "date-fns";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { mkdir, stat, writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("file") as Blob | null;
  if (!file) {
    return NextResponse.json({ error: "File blob is required." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const uploadDir = join(process.cwd(), "uploads");

  try {
    await stat(uploadDir);
  } catch (e) {
    if ((e as { code: string }).code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("Error while trying to create directory when uploading a file\n", e);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e12)}`;
    const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${relativeUploadDir}-${filename}`, buffer);
    return NextResponse.json({ fileUrl: `${relativeUploadDir}-${filename}` });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
