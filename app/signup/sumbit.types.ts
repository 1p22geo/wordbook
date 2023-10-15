import { ReactNode } from "react";
import { alertType } from "components/Alert";

export type seterr = ({ type, message }: { type: alertType | null; message: ReactNode }) => void;
export type alertMessage = {
  type: alertType | null;
  message: ReactNode;
};
