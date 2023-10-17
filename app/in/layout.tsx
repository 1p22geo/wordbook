import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { checkSession } from "util/checkSession";

const Layout = async ({ children }: { children: ReactNode }) => {
  const sessionID = cookies().get("session")?.value;
  console.log(sessionID);
  if (!sessionID) redirect("/");
  const session = await checkSession(sessionID);
  console.log(session);
  return <>{children}</>;
};

export default Layout;
