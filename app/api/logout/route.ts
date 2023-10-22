import opentelemetry from "@opentelemetry/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function GET() {
  const tracer = opentelemetry.trace.getTracer('next-app')
  tracer.startActiveSpan('logout api', (span)=>{
    try{

      cookies().set("session", "");
      redirect("/");
    }
    finally{
      span.end()
    }
  })
}
