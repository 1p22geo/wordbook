import opentelemetry from "@opentelemetry/api";
import { MongoClient, ObjectId } from "mongodb";
import { Session, SessionID } from "schemas/session";
import { UserID } from "schemas/user";
export const dynamic = "force-dynamic";
export interface requestJSON {
  session: ObjectId;
}
export interface responseJSON {
  active: boolean;
  exists: boolean;
  left?: number;
  session?: SessionID;
  user?: UserID;
}

export async function POST(request: Request) {
  const tracer = opentelemetry.trace.getTracer("next-app");
  return await tracer.startActiveSpan("check session", async (span) => {
    const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");

    try {
      await client.connect();
      const json = (await request.json()) as requestJSON;

      const db = client.db("wordbook");
      const coll = db.collection("sessions");

      const res = (await coll.findOne({ _id: new ObjectId(json.session) })) as Session | null;
      if (!res) {
        // no user with such login and password
        await client.close();
        return Response.json({ error: "No such session", active: false, exists: false }, { status: 404 });
      }
      span.addEvent("session found");
      span.setAttribute("session", JSON.stringify(res));
      const coll_users = db.collection("users");
      const res2 = (await coll_users.findOne({ _id: new ObjectId(res.user) })) as UserID | null;

      if (!res2) {
        await client.close();
        return Response.json(
          {
            error: "User deleted... ? We don't quite know what happened. This SHOULD be impossible.",
            active: false,
            exists: false,
          },
          { status: 501 }
        );
      }
      span.addEvent("user found");
      span.setAttribute("user", JSON.stringify(res2));

      await client.close();
      span.addEvent("client closed");

      const time = Date.now();

      const active = time - res.started < res.duration;

      if (!active)
        return Response.json(
          {
            session: res,
            user: res2,
            active: active,
            exists: true,
            left: res.duration - (time - res.started),
          } as responseJSON,
          { status: 403 }
        );
      return Response.json(
        {
          session: res,
          user: res2,
          active: active,
          exists: true,
          left: res.duration - (time - res.started),
        } as responseJSON,
        { status: 200 }
      );
    } catch (e) {
      console.error(e);
      client.close();
      span.addEvent("client closed - error");
      return Response.json({}, { status: 400 });
    } finally {
      span.end();
    }
  });
}
