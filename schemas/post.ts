import { ObjectId, WithId } from "mongodb";
import { UserID } from "./user";

export interface Comment {
  author: UserID;
  content: string;
  posted: number;
}

export interface Post {
  author: ObjectId;
  posted: number;
  content: string;
  up: number;
  down: number;
  comments: Comment[];
}

export interface PostAuthor {
  author: UserID;
  posted: number;
  content: string;
  up: number;
  down: number;
  comments: Comment[];
}

export interface PostID extends WithId<Post> {}
export interface PostAuthorID extends WithId<PostAuthor> {}
