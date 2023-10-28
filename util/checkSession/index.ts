import { successJSON } from "app/api/check/route";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkSession(session: string): Promise<successJSON> {
  let res = await fetch(`http://${headers().get("host")}/api/check`, {
    method: "POST",
    body: JSON.stringify({
      session: session,
    }),
  });
  if (!res.ok) {
    redirect("/");
  }
  let json = (await res.json()) as successJSON;

  return json;
}
