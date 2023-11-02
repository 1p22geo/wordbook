import opentelemetry from "@opentelemetry/api";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { responseJSON } from "app/api/post/route.get";
import { PostView } from "app/in/PostView";
import { checkSession } from "util/checkSession";
import { checkUser } from "util/checkUser";

const Page = async ({ params }: { params: { id: string } }) => {
  const tracer = opentelemetry.trace.getTracer("next-app");
  const span = tracer.startSpan("user profile");
  const sessionID = cookies().get("session")?.value;
  span.setAttribute("sessionID", sessionID as string);
  if (!sessionID) redirect("/");

  await checkSession(sessionID);
  let user;
  let posts;
  try {
    user = await checkUser(params.id, true);
    span.setAttribute("user exists", true);
  } catch {
    span.setAttribute("user exists", false);
  }
  if (user) {
    try {
      posts = (await (
        await fetch(`http://${headers().get("host")}/api/post?user=${user.user._id}`, {
          headers: { Cookie: `session=${sessionID}` },
        })
      ).json()) as responseJSON;
      span.setAttribute("posts found", true);
    } catch {
      span.setAttribute("posts found", false);
    }
  }
  span.end();
  return (
    <div className="flex w-screen max-w-[100vw] flex-col items-center gap-8 p-24">
      <div className="flex  flex-col items-start self-stretch bg-secondary-100 p-4 shadow-2xl">
        {user ? (
          <>
            <h1 className="text-xl font-bold">User profile</h1>
            <div className="p-4">
              <div className="flex flex-row gap-4 p-2">
                <div className="group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12">
                    <circle cx="12" cy="12" r="10" className="fill-primary-600" />
                    <path
                      className="fill-primary-100"
                      d="M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                    />
                  </svg>{" "}
                  <div className="absolute z-10 scale-y-0 bg-secondary-200 p-2 shadow-2xl duration-200 group-hover:scale-y-100">
                    <h2>{user.user.name}</h2>
                    <h3 className="mb-4 text-sm">&lt;{user.user.email}&gt;</h3>
                  </div>
                </div>
                <div className="flex flex-col items-start text-left">
                  <h2 className="font-bold">{user.user.name}</h2>
                  <h3 className="text-sm text-secondary-700">
                    {" "}
                    Signed up: {new Date(user.user.added).toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>{" "}
            <h3 className="text-lg font-semibold">Account description</h3>
            <div className="prose m-8 bg-secondary-200 p-4">
              <Markdown
                remarkPlugins={[remarkParse as never, remarkMath, remarkRehype, rehypeKatex, rehypeStringify as never]}
              >
                {user.data.desc.replace(/```KaTeX((.|\n|\r)*?)```/gs, "$$$ $1 $$$")}
              </Markdown>
            </div>
            {posts ? (
              <div className="flex max-w-[100vw] flex-col items-center gap-8 self-center p-24">
                <h2 className="text-xl font-bold">User&apos;s posts</h2>
                <PostView initPosts={posts.posts} url={`/api/post?user=${user.user._id}`} />
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <h1 className="text-xl font-bold">No such user found</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
