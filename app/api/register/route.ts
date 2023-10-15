import { sha256 } from "js-sha256";
import { MongoClient } from "mongodb";
import { User } from "schemas/user";
export const dynamic = "force-dynamic";
interface requestJSON {
  email: string;
  pass: string;
  name: string;
}

export async function POST(request: Request) {
  const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");

  try {
    await client.connect();
    const json = (await request.json()) as requestJSON;

    const db = client.db("wordbook");
    const coll = db.collection("users");

    const hash = sha256(json.pass);

    const user: User = {
      email: json.email,
      name: json.name,
      hash: hash,
      added: Date.now(),
      type: "user",
    };

    const res = await coll.insertOne(user);

    client.close();
    return Response.json({ id: res.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    client.close();
    return Response.json({}, { status: 400 });
  }
}
