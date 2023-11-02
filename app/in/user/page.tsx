import opentelemetry from "@opentelemetry/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { checkSession } from "util/checkSession";
import { checkUser } from "util/checkUser";
import { submit } from "./action";
import { DescriptionEditor } from "./DescEdit";

const Page = async () => {
  const tracer = opentelemetry.trace.getTracer("next-app");
  const span = tracer.startSpan("self profile");
  const sessionID = cookies().get("session")?.value;
  span.setAttribute("sessionID", sessionID as string);
  if (!sessionID) redirect("/");

  const session = await checkSession(sessionID);
  const user = await checkUser(session.user._id as unknown as string);

  span.end();
  return (
    <div className="flex w-screen max-w-[100vw] flex-col items-center gap-8 p-24">
      <div className="flex  flex-col items-start self-stretch bg-secondary-100 p-4 shadow-2xl">
        <h1 className="text-xl font-bold">Your profile</h1>
        <div className="p-4">
          <div className="flex flex-row gap-4 p-2">
            <div className="group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12">
                <circle cx="12" cy="12" r="10" className="fill-primary-600" />
                <path
                  className="fill-primary-100"
                  d="M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                />
              </svg>
              <div className="absolute z-10 scale-y-0 bg-secondary-200 p-2 shadow-2xl duration-200 group-hover:scale-y-100">
                <h2>{session.user.name}</h2>
                <h3 className="mb-4 text-sm">&lt;{session.user.email}&gt;</h3>
              </div>
            </div>
            <div className="flex flex-col items-start text-left">
              <h2 className="font-bold">{session.user.name}</h2>
              <h3 className="text-sm text-secondary-700">Signed up: {new Date(session.user.added).toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-4 p-2">
          <DescriptionEditor current={user.data.desc} session={session.session._id.toString()} submit={submit} />
        </div>
        <div className="prose m-8 bg-secondary-200 p-4">
          <Markdown
            remarkPlugins={[remarkParse as never, remarkMath, remarkRehype, rehypeKatex, rehypeStringify as never]}
          >
            {user.data.desc.replace(/```KaTeX((.|\n|\r)*?)```/gs, "$$$ $1 $$$")}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default Page;
