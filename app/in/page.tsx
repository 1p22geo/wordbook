import { ObjectId } from "mongodb";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { responseJSON } from "app/api/post/route.get";
import { PostEditor } from "components/PostEditor";
import { checkSession } from "lib/checkSession";
import { checkUser } from "lib/checkUser";
import { PostView } from "./PostView";

const Page = async () => {
  const host = headers().get("host") || "localhost";
  const session = cookies().get("session")?.value;
  if (!session) redirect("/");
  const req = await fetch(`http://${host}/api/post`, { headers: { Cookie: `session=${session}` } });

  const sess = await checkSession(session);
  if (!sess) redirect("/");

  const user = await checkUser(sess.user._id.toString());
  const { posts } = (await req.json()) as responseJSON;
  return (
    <main className="flex max-w-[100vw] flex-col items-center gap-8 p-24">
      <PostEditor />
      <PostView voted={user.data.voted} initPosts={posts} session={session as unknown as ObjectId} />
    </main>
  );
};

export default Page;
