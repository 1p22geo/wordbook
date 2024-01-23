import opentelemetry from "@opentelemetry/api";
import { sha256 } from "js-sha256";
import { MongoClient } from "mongodb";
import { User, UserID } from "schemas/user";
export const dynamic = "force-dynamic";
interface requestJSON {
  email: string;
  pass: string;
  name: string;
}

export async function POST(request: Request) {
  const tracer = opentelemetry.trace.getTracer("next-app");
  return await tracer.startActiveSpan("register", async (span) => {
    const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");

    try {
      await client.connect();
      const json = (await request.json()) as requestJSON;

      const db = client.db("wordbook");
      const coll = db.collection("users");

      const hash = sha256(json.pass);

      const exists = (await coll.findOne({ email: json.email })) as UserID | null;

      if (exists) {
        return Response.json({ error: "User already exists" }, { status: 409 });
      }

      const user: User = {
        email: json.email,
        name: json.name,
        hash: hash,
        added: Date.now(),
        type: "user",
      };

      const res = await coll.insertOne(user);
      const res2 = await db.collection("userdata").insertOne({
        user: res.insertedId,
        desc: "No description yet.",
        voted: [],
        gallery: [],
      });
      span.addEvent("user inserted");
      span.setAttribute("id", res.insertedId.toHexString());
      span.setAttribute("data_id", res2.insertedId.toHexString());

      await client.close();
      span.addEvent("client closed");
      return Response.json({ id: res.insertedId }, { status: 201 });
    } catch (e) {
      console.error(e);
      await client.close();
      span.addEvent("client closed - error");
      return Response.json({}, { status: 400 });
    } finally {
      span.end();
    }
  });
}
