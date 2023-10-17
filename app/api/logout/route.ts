import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function POST() {
  cookies().set("session", "");
  redirect("/");
}
