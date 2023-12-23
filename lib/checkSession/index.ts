import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { successJSON } from "app/api/check/route";

export async function checkSession(session: string, redirect_fail = true): Promise<successJSON | undefined> {
  const res = await fetch(`http://${headers().get("host") || ""}/api/check`, {
    method: "POST",
    body: JSON.stringify({
      session: session,
    }),
  });
  if (!res.ok) {
    if (redirect_fail) redirect("/");
    return;
  }
  const json = (await res.json()) as successJSON;

  return json;
}
