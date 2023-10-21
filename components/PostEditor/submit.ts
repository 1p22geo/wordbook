import { Dispatch, SetStateAction } from "react";
import { alertMessage } from "components/Alert";

export async function submit(post: string, setalert: Dispatch<SetStateAction<alertMessage>>) {
  const res = await fetch("/api/post", { method: "POST", body: JSON.stringify({ content: post }) });
  if (res.ok) window.location.reload();
  else setalert({ type: "error", message: "Something has gone wrong" });
}