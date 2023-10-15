import { sumbit } from "./sumbit";
import { alertMessage, seterr } from "./sumbit.types";
let er: alertMessage;
const seterror: seterr = (newErr: alertMessage) => {
  er = newErr;
};

beforeEach(() => {
  er = { type: null, message: "" };
});

describe("submit", () => {
  it("should show no email dialog", () => {
    sumbit({ email: "", name: "", pass: "", rpass: "" }, seterror);
    expect(er).toStrictEqual({ type: "error", message: "Please provide an e-mail address" });
  });
  it("should show no username dialog", () => {
    sumbit({ email: "email@email.com", name: "", pass: "", rpass: "" }, seterror);
    expect(er).toStrictEqual({ type: "error", message: "Please provide your name" });
  });
  it("should show no password dialog", () => {
    sumbit({ email: "email@email.com", name: "user", pass: "", rpass: "" }, seterror);
    expect(er).toStrictEqual({ type: "error", message: "Please provide a password" });
  });
  it("should show repeat password dialog", () => {
    sumbit({ email: "email@email.com", name: "user", pass: "qwe", rpass: "qw1" }, seterror);
    expect(er).toStrictEqual({ type: "error", message: "Please repeat the password for security" });
  });
  it("should make the fetch on correct data", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 }),
      })
    ) as jest.Mock;
    sumbit({ email: "email@email.com", name: "user", pass: "qwe", rpass: "qwe" }, seterror);
    expect(er).toStrictEqual({ type: "loading", message: "Please wait..." });
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith("https://reqres.in/api/users?delay=2");
  });
});
