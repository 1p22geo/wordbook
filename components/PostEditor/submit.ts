import { Dispatch, SetStateAction } from "react";
import { alertMessage } from "components/Alert";
import { katexRegex } from "lib/katexRegex";

export async function submit(post: string, setalert: Dispatch<SetStateAction<alertMessage>>) {
  const npost = katexRegex(post);
  const res = await fetch("/api/post", { method: "POST", body: JSON.stringify({ content: npost }) });
  if (res.ok) window.location.reload();
  else setalert({ type: "error", message: "Something has gone wrong" });
}
