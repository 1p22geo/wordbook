import { cookies, headers } from "next/headers";
import { responseJSON } from "app/api/post/route.get";
import { PostEditor } from "components/PostEditor";
import { PostView } from "./PostView";

const Page = async () => {
  const host = headers().get("host") || "localhost";
  const session = cookies().get("session")?.value;

  const req = await fetch(`http://${host}/api/post`, { headers: { Cookie: `session=${session}` } });

  const { posts } = (await req.json()) as responseJSON;
  return (
    <div className="flex flex-col items-center gap-8 p-24">
      <PostEditor />
      <PostView initPosts={posts} />
    </div>
  );
};

export default Page;
