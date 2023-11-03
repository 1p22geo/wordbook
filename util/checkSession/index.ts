import { successJSON } from "app/api/check/route";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkSession(session: string, redirect_fail = true): Promise<successJSON | undefined> {
  let res = await fetch(`http://${headers().get("host")}/api/check`, {
    method: "POST",
    body: JSON.stringify({
      session: session,
    }),
  });
  if (!res.ok) {
    if (redirect_fail) redirect("/");
    return;
  }
  let json = (await res.json()) as successJSON;

  return json;
}
