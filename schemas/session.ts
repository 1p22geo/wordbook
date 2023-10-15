import { ObjectId, WithId } from "mongodb";

export interface Session {
  user: ObjectId;
  started: number;
  duration: number;
}
export interface SessionID extends WithId<Session> {}
