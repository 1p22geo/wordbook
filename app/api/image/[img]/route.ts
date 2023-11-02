import mime from "mime";
import fs from "fs";
import path from "path";

export async function GET(request: Request, { params }: { params: { img: string }}) {
  if (!params.img) {
    return Response.json({ error: "missing file" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "uploads", params.img);
  const stat = fs.statSync(filePath);

  const imageBuffer = fs.readFileSync(filePath);

  return new Response(imageBuffer, {
    headers: {
      "content-type": mime.getType(filePath) || "application/octet-stream",
      "Content-Length": stat.size.toString(),
    },
  });
}
