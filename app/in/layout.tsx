import opentelemetry from "@opentelemetry/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { checkSession } from "util/checkSession";

const Layout = async ({ children }: { children: ReactNode }) => {
  const tracer = opentelemetry.trace.getTracer("next-app");
  const span = tracer.startSpan("logged_in");
  const sessionID = cookies().get("session")?.value;
  span.setAttribute("sessionID", sessionID as string);
  if (!sessionID) redirect("/");
  const session = await checkSession(sessionID);
  span.setAttribute("session", JSON.stringify(session));
  span.end();
  return <>{children}</>;
};

export default Layout;
