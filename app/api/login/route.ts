import { sha256 } from "js-sha256";
import { MongoClient } from "mongodb";
import { Session } from "schemas/session";
import { UserID } from "schemas/user";
export const dynamic = "force-dynamic";
interface requestJSON {
  email: string;
  pass: string;
}

export async function POST(request: Request) {
  const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");

  try {
    await client.connect();
    const json = (await request.json()) as requestJSON;

    const db = client.db("wordbook");
    const coll = db.collection("users");

    const hash = sha256(json.pass);

    const res = (await coll.findOne({ email: json.email, hash: hash })) as UserID | null;
    if (!res) {
      // no user with such login and password
      await client.close();
      return Response.json({ error: "Wrong password" }, { status: 403 });
    }

    const session: Session = {
      user: res._id,
      started: Date.now(),
      duration: 5 * 60 * 1000,
    };

    const coll_sessions = db.collection("sessions");

    const { insertedId } = await coll_sessions.insertOne(session);

    client.close();
    return Response.json({ session: insertedId }, { status: 200, statusText: "Logged in" });
  } catch (e) {
    console.error(e);
    client.close();
    return Response.json({}, { status: 400 });
  }
}
