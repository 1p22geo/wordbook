import opentelemetry from "@opentelemetry/api";
import { MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { Comment } from "schemas/post";
import { Session } from "schemas/session";
import { UserID } from "schemas/user";
export const dynamic = "force-dynamic";
export interface requestJSON {
  post: ObjectId;
  content: string;
}

export async function POST(request: Request) {
  const tracer = opentelemetry.trace.getTracer("next-app");
  return await tracer.startActiveSpan("insert comment", async (span) => {
    const time = Date.now();
    const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");

    try {
      await client.connect();
      const json = (await request.json()) as requestJSON;
      if (!json.content) return Response.json({ error: "no json?" }, { status: 400 });
      const req_cookies = cookies();
      const sessionID = req_cookies.get("session")?.value;
      if (!sessionID) {
        return Response.json({ error: "No session provided" }, { status: 401 });
      }

      const db = client.db("wordbook");
      const coll = db.collection("sessions");

      const sess = (await coll.findOne({ _id: new ObjectId(sessionID) })) as Session | null;

      if (!sess) {
        // no user with such login and password
        await client.close();
        return Response.json({ error: "Authentication failure" }, { status: 403 });
      }
      span.addEvent("session found");
      span.setAttribute("session", JSON.stringify(sess));
      const active = time - sess.started < sess.duration;
      if (!active) {
        // no user with such login and password
        await client.close();
        return Response.json({ error: "Session expired" }, { status: 403 });
      }
      const coll_users = db.collection("users");
      const user = (await coll_users.findOne({ _id: new ObjectId(sess.user) })) as UserID | null;

      if (!user) {
        await client.close();
        return Response.json(
          {
            error: "User deleted... ? We don't quite know what happened. This SHOULD be impossible.",
          },
          { status: 501 }
        );
      }

      span.addEvent("user found");
      span.setAttribute("user", JSON.stringify(user));
      const coll_posts = db.collection("posts");
      const comment: Comment = {
        author: user,
        content: json.content,
        posted: time,
      };

      await coll_posts.updateOne(
        {
          _id: new ObjectId(json.post),
        },
        {
          $push: {
            comments: comment,
          },
        }
      );

      /*
      const res = await coll_posts.insertOne({
        content: json.content,
        posted: time,
        author: user._id,
        comments: []
      });
      */

      span.addEvent("comment inserted");
      await client.close();
      span.addEvent("client closed");

      return Response.json({}, { status: 201 });
    } catch (e) {
      console.error(e);
      await client.close();
      span.addEvent("client closed - error");
      return Response.json({}, { status: 400 });
    }
  });
}
