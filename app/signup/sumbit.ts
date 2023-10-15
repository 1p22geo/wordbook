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
  fetch("https://reqres.in/api/users?delay=2").then((res) => {
    alert(res.status);
    seterror({ type: null, message: "" });
  });
};
