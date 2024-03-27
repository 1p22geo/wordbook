"use server";

import { Collection, MongoClient, ObjectId } from "mongodb";
import { Post } from "schemas/post";
import { Session } from "schemas/session";
import { User } from "schemas/user";
import { UserData } from "schemas/userdata";

export async function votePostAction(id: ObjectId, vote: boolean, session: ObjectId) {
  const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");
  try {
    const time = Date.now();
    await client.connect();
    if (!session) {
      return false;
    }

    const db = client.db("wordbook");
    const coll: Collection<Session> = db.collection("sessions");

    const sess = await coll.findOne({ _id: new ObjectId(session) });

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
    const coll_users: Collection<User> = db.collection("users");
    const user = await coll_users.findOne({ _id: new ObjectId(sess.user) });

    if (!user) {
      await client.close();
      return false;
    }

    const coll_posts: Collection<Post> = db.collection("posts");

    await coll_posts.updateOne(
      { _id: new ObjectId(id) },
      {
        $inc: { [vote ? "up" : "down"]: 1 },
      }
    );

    const coll_data: Collection<UserData> = db.collection("userdata");

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
