import { init_state } from "../reducer";

export const getNextDisabled = (state: typeof init_state, page: number) => {
  switch (page) {
    case 0:
      return !state.email;
    case 1:
      return !state.name || !state.email;
    case 2:
      return !state.name || !state.email || !state.rpass || !state.pass || state.pass !== state.rpass;
    case 3:
      return !state.name || !state.email || !state.rpass || !state.pass || state.pass !== state.rpass;
  }

  return false;
};
