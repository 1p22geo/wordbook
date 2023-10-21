import { cookies, headers } from "next/headers";
import { responseJSON } from "app/api/post/route.get";
import { Post } from "components/Post";

const Page = async () => {
  const host = headers().get("host") || "localhost";
  const session = cookies().get("session")?.value;

  const { posts } = (await (
    await fetch(`http://${host}/api/post`, { headers: { Cookie: `session=${session}` } })
  ).json()) as responseJSON;

  return (
    <div className="flex flex-col items-center gap-8 p-24">
      {posts.map((post) => (
        <Post key={post._id.toString()} post={post} />
      ))}
    </div>
  );
};

export default Page;
