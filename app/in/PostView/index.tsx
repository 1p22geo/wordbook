"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { responseJSON } from "app/api/post/route.get";
import { Post } from "components/Post";
import { PostAuthorID } from "schemas/post";
import { isInViewport } from "util/inViewport";

export const PostView = ({ initPosts }: { initPosts: PostAuthorID[] }) => {
  const [posts, setposts] = useState(initPosts);
  const [page, setpage] = useState(1);
  const [fetching, setfetching] = useState(false);
  const [end, setend] = useState(false);
  const spinnerRef = useRef() as RefObject<HTMLDivElement>;
  useEffect(() => {
    const el = () => {
      if (!spinnerRef.current) return;
      if (isInViewport(spinnerRef.current)) {
        console.log(fetching);
        if (!fetching) {
          setfetching(true);
          console.log("Fetching more posts...");
          fetch(`/api/post?page=${page}`).then((res) => {
            if (!res.ok) throw Error("error in fetching");
            res.json().then((temp) => {
              const json = temp as responseJSON;
              setposts((p) => [...p, ...json.posts]);
              setpage((p) => p + 1);
              if (!json.posts.length) {
                setend(true);
                return;
              }
              setfetching(false);
            });
          });
        }
      }
    };
    document.addEventListener("scroll", el);

    return () => {
      document.removeEventListener("scroll", el);
    };
  }, [fetching, page]);
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
