import { ObjectId } from "mongodb";
import { Dispatch, SetStateAction } from "react";
import { PostAuthorID } from "schemas/post";
import { votePostAction } from "./action";

export type votePostCallback = (id: ObjectId, vote: boolean) => void;

export function createVotePost(
  setposts: Dispatch<SetStateAction<PostAuthorID[]>>,
  voted: ObjectId[],
  setvoted: Dispatch<SetStateAction<ObjectId[]>>,
  session: ObjectId
): votePostCallback {
  return (id: ObjectId, vote: boolean) => {
    for (let i = 0; i < voted.length; i++) {
      const vote = voted[i];
      if (vote === id) {
        return;
      }
    }

    votePostAction(id, vote, session);
    setvoted([...voted, id]);
    setposts((posts) =>
      posts.map((post) => {
        if (post._id !== id) return post;
        else
          return {
            ...post,
            up: post.up + (vote ? 1 : 0),
            down: post.down + (!vote ? 1 : 0),
          };
      })
    );
  };
}
