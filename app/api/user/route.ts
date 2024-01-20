import opentelemetry from "@opentelemetry/api";
import { MongoClient, ObjectId } from "mongodb";
import { UserID } from "schemas/user";
import { UserDataID } from "schemas/userdata";
export const dynamic = "force-dynamic";
export interface requestJSON {
  id: ObjectId;
}
export interface responseJSON {
  user: UserID;
  data: UserDataID;
}

export async function POST(request: Request) {
  const tracer = opentelemetry.trace.getTracer("next-app");
  return tracer.startActiveSpan("check user", {}, async (span) => {
    const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");

    try {
      await client.connect();
      const json = (await request.json()) as requestJSON;
      try {
        new ObjectId(json.id);
      } catch {
        return Response.json({ error: "Wrong ID" }, { status: 400 });
      }
      const db = client.db("wordbook");

      const coll = db.collection("users");

      const res = (await coll.findOne({ _id: new ObjectId(json.id) })) as UserID | null;
      if (!res) {
        // no user with such login and password
        await client.close();
        span.addEvent("client closed (error)");

        return Response.json({ error: "No such user" }, { status: 404 });
      }
      res.hash = "x"
      span.addEvent("user found");
      const coll_data = db.collection("userdata");

      const data = (await coll_data.findOne({ user: new ObjectId(json.id) })) as UserDataID | null;
      if (!data) {
        // no user with such login and password
        await client.close();
        span.addEvent("client closed (error)");

        return Response.json({ error: "Something weird happened. This should be impossible." }, { status: 500 });
      }
      span.addEvent("data found");

      await client.close();

      span.addEvent("client closed");

      return Response.json(
        {
          user: res,
          data: data,
        } as responseJSON,
        { status: 200 }
      );
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
