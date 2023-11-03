"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { responseJSON } from "app/api/post/route.get";
import { Post } from "components/Post";
import { PostAuthorID } from "schemas/post";
import { isInViewport } from "util/inViewport";

export const PostView = ({ initPosts, url = "/api/post?" }: { initPosts: PostAuthorID[]; url?: string }) => {
  const [posts, setposts] = useState(initPosts);
  const [page, setpage] = useState(0);
  const [pages, setpages] = useState(0);
  const [end, setend] = useState(false);
  const spinnerRef = useRef() as RefObject<HTMLDivElement>;
  useEffect(() => {
    const el = () => {
      if (!spinnerRef.current) return;
      if (end) return;
      if (isInViewport(spinnerRef.current)) {
        if (page === pages) {
          setpage(page + 1);

          fetch(`${url}page=${page + 1}`).then((res) => {
            res.json().then((temp) => {
              const json = temp as responseJSON;
              setposts([...posts, ...json.posts]);
              setpages(pages + 1);
              if (!json.posts.length) {
                setend(true);
              }
            });
          });
        }
      }
    };
    el();
    document.addEventListener("scroll", el);

    return () => {
      document.removeEventListener("scroll", el);
    };
  }, [page, pages, url, end, posts]);
  return (
    <>
      {posts.map((post) => (
        <Post key={post._id.toString()} post={post} />
      ))}
      {end ? (
        <div className="flex w-fit flex-col items-stretch bg-secondary-100 p-4 text-secondary-400 shadow-2xl">
          This is the end.
        </div>
      ) : (
        <div className="flex w-fit flex-col items-stretch bg-secondary-100 p-4 shadow-2xl" ref={spinnerRef}>
          <div className=" h-24 w-24 animate-spin rounded-full bg-secondary-600">
            <div className=" mx-4 mt-4 h-16 w-16 rounded-full bg-secondary-100"></div>
            <div className="ml-12 h-4 w-2 bg-secondary-100"></div>
          </div>
        </div>
      )}
    </>
  );
};
