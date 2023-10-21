import { trace } from "@opentelemetry/api";
import { MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { PostsAggregation } from "schemas/aggregations/posts";
import { PostAuthorID } from "schemas/post";
import { Session } from "schemas/session";

export interface responseJSON {
  posts: PostAuthorID[];
}

export async function GET() {
  const tracer = trace.getTracer("next-app");
  return tracer.startActiveSpan("fetch_posts", async (span) => {
    const time = Date.now();
    const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");

    try {
      await client.connect();
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
      const active = time - sess.started < sess.duration;
      if (!active) {
        // no user with such login and password
        await client.close();
        return Response.json({ error: "Session expired" }, { status: 403 });
      }

      const coll_posts = db.collection("posts");

      const posts = (await coll_posts.aggregate(PostsAggregation).toArray()) as PostAuthorID[] | null;

      await client.close();

      return Response.json({ posts: posts } as responseJSON, { status: 200 });
    } catch {
      await client.close();
      return Response.json({}, { status: 400 });
    } finally {
      span.end();
    }
  });
}
