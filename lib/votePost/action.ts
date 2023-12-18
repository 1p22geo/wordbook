"use server";

import { MongoClient, ObjectId } from "mongodb";
import { Session } from "schemas/session";
import { UserID } from "schemas/user";

export async function votePostAction(id: ObjectId, vote: boolean, session: ObjectId) {
  console.log(`${vote ? "up" : "down"}voting post ${id}`);

  const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");
  try {
    const time = Date.now();
    await client.connect();
    if (!session) {
      return false;
    }

    const db = client.db("wordbook");
    const coll = db.collection("sessions");

    const sess = (await coll.findOne({ _id: new ObjectId(session) })) as Session | null;

    if (!sess) {
      // no user with such login and password
      await client.close();
      return false;
    }
    const active = time - sess.started < sess.duration;
    if (!active) {
      // no user with such login and password
      await client.close();
      return false;
    }
    const coll_users = db.collection("users");
    const user = (await coll_users.findOne({ _id: new ObjectId(sess.user) })) as UserID | null;

    if (!user) {
      await client.close();
      return false;
    }

    const coll_posts = db.collection("posts");

    await coll_posts.updateOne(
      { _id: new ObjectId(id) },
      {
        $inc: { [vote ? "up" : "down"]: 1 },
      }
    );

    const coll_data = db.collection("userdata");
    console.log(`user: ${user._id}`);

    console.log(
      await coll_data.updateOne(
        { user: new ObjectId(user._id) },
        {
          $push: {
            voted: new ObjectId(id),
          },
        }
      )
    );

    await client.close();

    return true;
  } catch (e) {
    console.error(e);
    await client.close();
    return false;
  }
}
