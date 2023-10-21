import { ObjectId, WithId } from "mongodb";

export interface Post{
    author:ObjectId;
    posted:number;
    content:string;
}
export interface PostID extends WithId<Post> {}