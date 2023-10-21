import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { PostAuthorID } from "schemas/post";

export const Post = ({ post }: { post: PostAuthorID }) => {
  return (
    <div className="flex w-fit flex-col items-stretch bg-secondary-100 shadow-2xl">
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
            <h2>{post.author.name}</h2>
            <h3 className="mb-4 text-sm">&lt;{post.author.email}&gt;</h3>
          </div>
        </div>
        <div className="flex flex-col items-start text-left">
          <h2 className="font-bold">{post.author.name}</h2>
          <h3 className="text-sm text-secondary-700">{new Date(post.posted).toLocaleString()}</h3>
        </div>
      </div>
      <div className="prose m-8 bg-secondary-200 p-4">
        <Markdown
          remarkPlugins={[remarkParse as never, remarkMath, remarkRehype, rehypeKatex, rehypeStringify as never]}
        >
          {post.content}
        </Markdown>
      </div>
    </div>
  );
};
