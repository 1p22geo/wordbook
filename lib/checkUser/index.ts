import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { responseJSON } from "app/api/user/route";

export async function checkUser(user: string, noredirect?: boolean): Promise<responseJSON> {
  const res = await fetch(`http://${headers().get("host")}/api/user`, {
    method: "POST",
    body: JSON.stringify({
      id: user,
    }),
  });
  if (!res.ok && !noredirect) {
    redirect("/");
  }
  if (!res.ok) {
    throw new Error("no user");
  }
  const json = (await res.json()) as responseJSON;

  return json;
}
