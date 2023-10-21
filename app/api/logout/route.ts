import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function GET() {
  cookies().set("session", "");
  redirect("/");
}
