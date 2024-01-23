import Link from "next/link";
import { init_state } from "./reducer";
import { seterr } from "./sumbit.types";

export const sumbit = (state: typeof init_state, seterror: seterr) => {
  if (!state.email) {
    seterror({ type: "error", message: "Please provide an e-mail address" });
    return;
  }
  if (!state.name) {
    seterror({ type: "error", message: "Please provide your name" });
    return;
  }
  if (!state.pass) {
    seterror({ type: "error", message: "Please provide a password" });
    return;
  }
  if (state.pass !== state.rpass) {
    seterror({ type: "error", message: "Please repeat the password for security" });
    return;
  }
  seterror({ type: "loading", message: "Please wait..." });
  fetch(`${window.location.protocol}//${window.location.host}/api/register`, {
    method: "POST",
    body: JSON.stringify({
      email: state.email,
      name: state.name,
      pass: state.pass,
    }),
  }).then(
    (res) => {
      if (res.ok) {
        seterror({
          type: "success",
          message: (
            <>
              Account created. You can now log in{" "}
              <Link href={"/login"} className="cursor-pointer text-primary-600 hover:underline">
                here
              </Link>
            </>
          ),
        });
      }
      else{
        if(res.status === 409){
          seterror({
            type:  "warning",
            message: (
              <>
                There already exists a user with this username. How about adding some digits to the end?
              </>
            ),
          });
        }
      }
    },
    () => {
      seterror({
        type: "error",
        message: <>Someting went wrong.</>,
      });
    }
  );
};
