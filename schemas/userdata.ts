import { ObjectId, WithId } from "mongodb";

export interface UserData {
  user: ObjectId;
  desc: string;
  gallery: { url: string }[];
}
export interface UserDataID extends WithId<UserData> {}
