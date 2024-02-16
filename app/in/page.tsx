import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { responseJSON } from "app/api/post/route.get";
import { Alert } from "components/Alert";
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
      <h1 className="w-full text-xl font-semibold">Write a post:</h1>
      <Suspense fallback={<Alert type="loading">Loading editor...</Alert>}>
        <PostEditor />
      </Suspense>
      <Suspense fallback={<Alert type="loading">Loading posts...</Alert>}>
        <PostView voted={user.data.voted} initPosts={posts} session={session} />
      </Suspense>
    </main>
  );
};

export default Page;
