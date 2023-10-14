import { MongoClient } from "mongodb"
import { cookies } from "next/headers"
const uri = "mongodb://10.5.0.3:27017/?directConnection=true"

export async function GET(request: Request) {
  const cookieStore = cookies()
  const host = cookieStore.get("host")
  const client = new MongoClient(uri)
  try {
    // Connect to the MongoDB cluster
    await client.connect()

    // Make the appropriate DB calls
    console.log("Connected")
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
  return Response.json({})
}
