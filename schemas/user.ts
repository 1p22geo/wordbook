import { OptionalId, WithId } from "mongodb";

export type userType = "user" | "admin" | "moderator";

export interface User {
  email: string;
  name: string;
  hash: string;
  added: number;
  type: userType;
}
export interface UserID extends WithId<User> {}
