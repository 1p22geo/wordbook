import { trace } from "@opentelemetry/api";
import { MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { PostsAggregation } from "schemas/aggregations/posts";
import { PostAuthorID } from "schemas/post";
import { Session } from "schemas/session";

export interface responseJSON {
  posts: PostAuthorID[];
}

export async function GET(request: Request) {
  const tracer = trace.getTracer("next-app");
  return await tracer.startActiveSpan("fetch_posts", async (span) => {
    const time = Date.now();
    const page = parseInt(new URL(request.url).searchParams.get("page") || "0");
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
      span.addEvent("session found");
      span.setAttribute("session", JSON.stringify(sess));
      const active = time - sess.started < sess.duration;
      if (!active) {
        // no user with such login and password
        await client.close();
        return Response.json({ error: "Session expired" }, { status: 403 });
      }
      const coll_posts = db.collection("posts");
      const cursor = coll_posts
        .aggregate(JSON.parse(JSON.stringify(PostsAggregation)) as Document[])
        .skip(page * 5)
        .limit(5);
      const posts = await cursor.toArray();

      span.addEvent("posts found");
      span.setAttribute("posts", JSON.stringify(posts));
      await client.close();
      span.addEvent("client closed");

      return Response.json({ posts: posts } as responseJSON, { status: 200 });
    } catch {
      await client.close();
      span.addEvent("client closed - error");
      return Response.json({}, { status: 400 });
    } finally {
      span.end();
    }
  });
}
