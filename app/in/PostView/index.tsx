"use client";

import { ObjectId } from "mongodb";
import { RefObject, useEffect, useRef, useState } from "react";
import { responseJSON } from "app/api/post/route.get";
import { Post } from "components/Post";
import { isInViewport } from "lib/inViewport";
import { createVotePost } from "lib/votePost";
import { PostAuthorID } from "schemas/post";

export const PostView = ({
  initPosts,
  url = "/api/post?",
  voted: initVoted = [],
  session,
}: {
  initPosts: PostAuthorID[];
  url?: string;
  voted?: ObjectId[];
  session: ObjectId;
}) => {
  const [posts, setposts] = useState(initPosts);
  const [page, setpage] = useState(0);
  const [pages, setpages] = useState(0);
  const [end, setend] = useState(false);
  const [voted, setvoted] = useState<ObjectId[]>(initVoted);
  const spinnerRef = useRef() as RefObject<HTMLDivElement>;
  useEffect(() => {
    const el = () => {
      if (!spinnerRef.current) return;
      if (end) return;
      if (isInViewport(spinnerRef.current)) {
        if (page === pages) {
          setpage(page + 1);

          fetch(`${url}page=${page + 1}`).then(
            (res) => {
              res.json().then(
                (temp) => {
                  const json = temp as responseJSON;
                  setposts([...posts, ...json.posts]);
                  setpages(pages + 1);
                  if (!json.posts.length) {
                    setend(true);
                  }
                },
                () => {
                  setTimeout(() => {
                    el();
                  }, 1000);
                }
              );
            },
            () => {
              setTimeout(() => {
                el();
              }, 1000);
            }
          );
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
        <Post key={post._id.toString()} post={post} votePost={createVotePost(setposts, voted, setvoted, session)} />
      ))}
      {end ? (
        <div className="flex w-fit flex-col items-stretch bg-secondary-100 p-4 text-secondary-400 shadow-2xl">
          This is the end.
        </div>
      ) : (
        <div
          className="flex w-fit flex-col items-stretch bg-secondary-100 p-4 text-black shadow-2xl"
          aria-label="Loading more posts..."
          role="alert"
          ref={spinnerRef}
        >
          <div className="h-24 w-24 animate-spin rounded-full bg-secondary-600 text-white">
            <div className="mx-4 mt-4 h-16 w-16 rounded-full bg-secondary-100"></div>
            <div className="ml-12 h-4 w-2 bg-secondary-100"></div>
          </div>
        </div>
      )}
    </>
  );
};
