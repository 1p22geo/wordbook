import { ObjectId, WithId } from "mongodb";

export interface UserData {
  user: ObjectId;
  desc: string;
  gallery: { url: string }[];
  voted: ObjectId[];
}
export interface UserDataID extends WithId<UserData> {}
