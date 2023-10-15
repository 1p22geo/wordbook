import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
const uri = process.env.MONGO_URI ? process.env.MONGO_URI : "";

export async function GET(_request: Request) {
  const cookieStore = cookies();
  const _host = cookieStore.get("host");
  const client = new MongoClient(uri);
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    console.log("Connected");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return Response.json({});
}
