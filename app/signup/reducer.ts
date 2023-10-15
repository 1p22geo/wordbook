export const init_state = { email: "", name: "", pass: "", rpass: "" };

export const reducer = (
  state: typeof init_state,
  action: { type: "change_email" | "change_name" | "change_pass" | "change_rpass"; payload: string }
) => {
  switch (action.type) {
    case "change_email":
      return {
        ...state,
        email: action.payload,
      };
    case "change_name":
      return {
        ...state,
        name: action.payload,
      };
    case "change_pass":
      return {
        ...state,
        pass: action.payload,
      };
    case "change_rpass":
      return {
        ...state,
        rpass: action.payload,
      };
    default:
      return state;
  }
};
