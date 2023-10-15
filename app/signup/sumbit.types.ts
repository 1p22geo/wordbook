import { alertType } from "components/Alert";

export type seterr = ({ type, message }: { type: alertType | null; message: string }) => void;
export type alertMessage = {
  type: alertType | null;
  message: string;
};
