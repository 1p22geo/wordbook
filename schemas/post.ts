import { ObjectId, WithId } from "mongodb";
import { UserID } from "./user";

export interface Post {
  author: ObjectId;
  posted: number;
  content: string;
}

export interface PostAuthor {
  author: UserID;
  posted: number;
  content: string;
}

export interface PostID extends WithId<Post> {}
export interface PostAuthorID extends WithId<PostAuthor> {}
