import { ObjectId, WithId } from "mongodb";

export interface UserData {
  user: ObjectId;
  desc: string;
}
export interface UserDataID extends WithId<UserData> {}
