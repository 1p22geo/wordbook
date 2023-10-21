import { MongoClient, ObjectId } from "mongodb";
import { UserID } from "schemas/user";
export const dynamic = "force-dynamic";
export interface requestJSON {
  id: ObjectId;
}
export interface responseJSON {
  user: UserID;
}

export async function POST(request: Request) {
  const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");

  try {
    await client.connect();
    const json = (await request.json()) as requestJSON;

    const db = client.db("wordbook");
    const coll = db.collection("users");

    const res = (await coll.findOne({ _id: new ObjectId(json.id) })) as UserID | null;
    if (!res) {
      // no user with such login and password
      await client.close();
      return Response.json({ error: "No such user", active: false, exists: false }, { status: 404 });
    }

    return Response.json(
      {
        user: res,
      } as responseJSON,
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    client.close();
    return Response.json({}, { status: 400 });
  }
}
