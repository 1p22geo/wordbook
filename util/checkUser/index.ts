import { responseJSON } from "app/api/user/route";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkUser(user: string, noredirect?: boolean): Promise<responseJSON> {
  let res = await fetch(`http://${headers().get("host")}/api/user`, {
    method: "POST",
    body: JSON.stringify({
      id: user,
    }),
  });
  if (!res.ok && !noredirect) {
    redirect("/");
  }
  if (!res.ok) {
    throw "no user";
  }
  let json = (await res.json()) as responseJSON;

  return json;
}
