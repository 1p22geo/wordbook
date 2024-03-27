import opentelemetry from "@opentelemetry/api";
import { Collection, MongoClient, ObjectId } from "mongodb";
import { Session, SessionID } from "schemas/session";
import { User, UserID } from "schemas/user";
export const dynamic = "force-dynamic";
export interface requestJSON {
  session: ObjectId;
}
export type responseJSON = successJSON | failureJSON;
export interface successJSON {
  active: boolean;
  exists: boolean;
  left: number;
  session: SessionID;
  user: UserID;
}
export interface failureJSON {
  active: boolean;
  exists: boolean;
}

export async function POST(request: Request) {
  const tracer = opentelemetry.trace.getTracer("next-app");
  return await tracer.startActiveSpan("check session", async (span) => {
    const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");

    try {
      await client.connect();
      const json = (await request.json()) as requestJSON;

      const db = client.db("wordbook");
      const coll: Collection<Session> = db.collection("sessions");

      const res = await coll.findOne({ _id: new ObjectId(json.session) });
      if (!res) {
        // no user with such login and password
        await client.close();
        return Response.json({ error: "No such session", active: false, exists: false }, { status: 404 });
      }
      span.addEvent("session found");
      span.setAttribute("session", JSON.stringify(res));
      const coll_users: Collection<User> = db.collection("users");
      const res2 = await coll_users.findOne({ _id: new ObjectId(res.user) });

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
      res2.hash = "x"; // that was a big one.
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
      await client.close();
      span.addEvent("client closed - error");
      return Response.json({}, { status: 400 });
    } finally {
      span.end();
    }
  });
}
