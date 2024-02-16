import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { PostEditor } from "components/PostEditor";
import { katexRegex } from "lib/katexRegex";
import { votePostCallback } from "lib/votePost";
import { PostAuthorID } from "schemas/post";

export const Post = ({ post, votePost: _votePost }: { post: PostAuthorID; votePost: votePostCallback | undefined }) => {
  const [showThread, setShowThread] = useState(false);
  let votePost: votePostCallback;
  if (!_votePost)
    votePost = () => {
      return;
    };
  else votePost = _votePost;
  return (
    <>
      <div className="flex w-fit flex-col items-stretch bg-secondary-100 shadow-2xl">
        <div className="flex flex-row gap-4 p-2">
          <Link href={`/in/user/${post.author._id.toString()}`} className="group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="user icon" className="w-12">
              <circle cx="12" cy="12" r="10" className="fill-primary-600" />
              <path
                className="fill-primary-100"
                d="M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
              />
            </svg>
            <div className="absolute z-10 scale-y-0 bg-secondary-200 p-2 shadow-2xl duration-200 group-hover:scale-y-100">
              <h2>{post.author.name}</h2>
              <h3 className="mb-4 text-sm">&lt;{post.author.email}&gt;</h3>
            </div>
          </Link>
          <div className="flex flex-col items-start text-left">
            <h2 className="font-bold">{post.author.name}</h2>
            <h3 className="text-sm text-secondary-700">
              {new Date(post.posted).toLocaleString("pl-PL", { timeZone: "UTC" })} UTC
            </h3>
          </div>
        </div>
        <div className="prose m-8 bg-secondary-200 p-4">
          <Markdown
            remarkPlugins={[remarkParse as never, remarkMath, remarkRehype, rehypeKatex, rehypeStringify as never]}
          >
            {post.content}
          </Markdown>
        </div>
        <div className="flex flex-row flex-nowrap items-center gap-4 p-4 font-mono tabular-nums">
          <div
            className="grid cursor-pointer place-content-center rounded-full bg-green-200 p-1 px-2 text-sm font-semibold text-green-900 outline outline-2 outline-green-900 hover:bg-green-400"
            onClick={() => {
              votePost(post._id, true);
            }}
          >
            <p>+ {post.up}</p>
          </div>
          <div
            className="grid cursor-pointer place-content-center rounded-full bg-red-200 p-1 px-2 text-sm font-semibold text-red-900 outline outline-2 outline-red-900 hover:bg-red-400"
            onClick={() => {
              votePost(post._id, false);
            }}
          >
            <p>- {post.down}</p>
          </div>
          <div className="mt-1 flex flex-row flex-nowrap gap-2 font-semibold text-primary-300 hover:font-bold hover:text-primary-600">
            <svg
              onClick={() => {
                setShowThread((q) => !q);
              }}
              height="800px"
              aria-label="toggle comment thread"
              width="800px"
              version="1.1"
              className="size-8 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29.338 29.338"
            >
              <g>
                <path
                  className="fill-primary-600"
                  d="M27.184,1.605H2.156C0.967,1.605,0,2.572,0,3.76v17.572c0,1.188,0.967,2.155,2.156,2.155h13.543
		l5.057,3.777c0.414,0.31,0.842,0.468,1.268,0.468c0.789,0,1.639-0.602,1.637-1.923v-2.322h3.523c1.188,0,2.154-0.967,2.154-2.155
		V3.76C29.338,2.572,28.371,1.605,27.184,1.605z M27.34,21.332c0,0.085-0.068,0.155-0.154,0.155h-5.523v3.955l-5.297-3.956H2.156
		c-0.086,0-0.154-0.07-0.154-0.155V3.759c0-0.085,0.068-0.155,0.154-0.155v0.001h25.029c0.086,0,0.154,0.07,0.154,0.155
		L27.34,21.332L27.34,21.332z M5.505,10.792h4.334v4.333H5.505C5.505,15.125,5.505,10.792,5.505,10.792z M12.505,10.792h4.334v4.333
		h-4.334V10.792z M19.505,10.792h4.334v4.333h-4.334V10.792z"
                />
              </g>
            </svg>
            {post.comments.length}
          </div>
        </div>
      </div>
      {showThread ? (
        <>
          {post.comments.map((comment) => (
            <>
              <div className="ml-32">
                {
                  <div className="bg-secondary-100 p-4 shadow-2xl">
                    <div className="flex flex-row gap-4 p-2">
                      <Link href={`/in/user/${comment.author._id.toString()}`} className="group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-label="user icon"
                          className="w-12"
                        >
                          <circle cx="12" cy="12" r="10" className="fill-primary-600" />
                          <path
                            className="fill-primary-100"
                            d="M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                          />
                        </svg>
                        <div className="absolute z-10 scale-y-0 bg-secondary-200 p-2 shadow-2xl duration-200 group-hover:scale-y-100">
                          <h2>{comment.author.name}</h2>
                          <h3 className="mb-4 text-sm">&lt;{comment.author.email}&gt;</h3>
                        </div>
                      </Link>
                      <div className="flex flex-col items-start text-left">
                        <h2 className="font-bold">{comment.author.name}</h2>
                        <h3 className="text-sm text-secondary-700">
                          {new Date(comment.posted).toLocaleString("pl-PL", { timeZone: "UTC" })} UTC
                        </h3>
                      </div>
                    </div>
                    <div className="prose m-8 bg-secondary-200 p-4">
                      <Markdown
                        remarkPlugins={[
                          remarkParse as never,
                          remarkMath,
                          remarkRehype,
                          rehypeKatex,
                          rehypeStringify as never,
                        ]}
                      >
                        {comment.content}
                      </Markdown>
                    </div>
                  </div>
                }
              </div>
            </>
          ))}
          <div className="bg-secondary-100 p-2 shadow-2xl">
            <h2 className="m-2 text-xl">Write a comment</h2>

            <PostEditor
              submit={async (content, setalert) => {
                const res = await fetch("/api/comment", {
                  method: "POST",
                  body: JSON.stringify({
                    post: post._id,
                    content: katexRegex(content),
                  }),
                });
                if (!res.ok) {
                  setalert({ message: "Something went wrong", type: "error" });
                } else {
                  window.location.reload();
                }
              }}
            />
          </div>
        </>
      ) : null}
    </>
  );
};
