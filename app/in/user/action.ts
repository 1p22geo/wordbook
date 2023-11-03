"use server";

import opentelemetry from "@opentelemetry/api";
import { MongoClient, ObjectId } from "mongodb";
import { Session } from "schemas/session";
import { UserID } from "schemas/user";

export const submitDescriptionChange = async (msg: string, session: string) => {
  "use server";
  const tracer = opentelemetry.trace.getTracer("next-app");
  return await tracer.startActiveSpan("change description", async (span) => {
    console.log("async server mutations");
    console.log(msg);
    console.log(session);
    const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");
    try {
      await client.connect();

      const db = client.db("wordbook");
      const coll = db.collection("sessions");

      const res = (await coll.findOne({ _id: new ObjectId(session) })) as Session | null;
      if (!res) {
        // no user with such login and password
        await client.close();
        return;
      }

      span.addEvent("session found");
      span.setAttribute("session", JSON.stringify(res));
      const coll_users = db.collection("users");
      const res2 = (await coll_users.findOne({ _id: new ObjectId(res.user) })) as UserID | null;

      if (!res2) {
        await client.close();
        return;
      }
      span.addEvent("user found");
      span.setAttribute("user", JSON.stringify(res2));

      span.addEvent("client closed");

      const time = Date.now();

      const active = time - res.started < res.duration;
      if (active) {
        console.log("Applying mutation");
        const coll_userdata = db.collection("userdata");

        await coll_userdata.updateOne(
          {
            user: res2._id,
          },
          {
            $set: {
              desc: msg,
            },
          }
        );
      }
    } finally {
      await client.close();
      span.end();
    }
  });
};

export const submitAddImage = async (url: string, session: string) => {
  "use server";
  const tracer = opentelemetry.trace.getTracer("next-app");
  return await tracer.startActiveSpan("upload gallery image", async (span) => {
    const client = new MongoClient(process.env.MONGO_URI ? process.env.MONGO_URI : "");
    try {
      await client.connect();

      const db = client.db("wordbook");
      const coll = db.collection("sessions");

      const res = (await coll.findOne({ _id: new ObjectId(session) })) as Session | null;
      if (!res) {
        // no user with such login and password
        await client.close();
        return;
      }

      span.addEvent("session found");
      span.setAttribute("session", JSON.stringify(res));
      const coll_users = db.collection("users");
      const res2 = (await coll_users.findOne({ _id: new ObjectId(res.user) })) as UserID | null;

      if (!res2) {
        await client.close();
        return;
      }
      span.addEvent("user found");
      span.setAttribute("user", JSON.stringify(res2));

      span.addEvent("client closed");

      const time = Date.now();

      const active = time - res.started < res.duration;
      if (active) {
        console.log("Applying mutation");
        const coll_userdata = db.collection("userdata");

        await coll_userdata.updateOne(
          {
            user: res2._id,
          },
          {
            $push: {
              gallery: {
                url: url,
              },
            },
          }
        );
      }
    } finally {
      await client.close();
      span.end();
    }
  });
};
