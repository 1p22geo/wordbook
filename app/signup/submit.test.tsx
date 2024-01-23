import Link from "next/link";
import { alertMessage } from "components/Alert";
import { sumbit } from "./sumbit";
import { seterr } from "./sumbit.types";
let er: alertMessage;
let seterror: seterr = (newErr: alertMessage) => {
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
  it("should make the fetch on correct data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ test: 100 }),
      })
    ) as jest.Mock;
    seterror = jest.fn((newErr: alertMessage) => {
      er = newErr;
    });
    sumbit({ email: "email@email.com", name: "user", pass: "qwe", rpass: "qwe" }, seterror);
    expect(er).toStrictEqual({ type: "loading", message: "Please wait..." });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost/api/register", {
      body: JSON.stringify({ email: "email@email.com", name: "user", pass: "qwe" }),
      method: "POST",
    });
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    expect(er).toStrictEqual({
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
  });
  it("should show a warning on already existent user", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 409,
        json: () => Promise.resolve({ error: "[test] User already exists" }),
      })
    ) as jest.Mock;
    seterror = jest.fn((newErr: alertMessage) => {
      er = newErr;
    });
    sumbit({ email: "email@email.com", name: "user", pass: "qwe", rpass: "qwe" }, seterror);
    expect(er).toStrictEqual({ type: "loading", message: "Please wait..." });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost/api/register", {
      body: JSON.stringify({ email: "email@email.com", name: "user", pass: "qwe" }),
      method: "POST",
    });
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    expect(er).toStrictEqual({
      type: "warning",
      message: <>There already exists a user with this username. How about adding some digits to the end?</>,
    });
  });
  it("should show an error on unexpected error", async () => {
    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;
    seterror = jest.fn((newErr: alertMessage) => {
      er = newErr;
    });
    sumbit({ email: "email@email.com", name: "user", pass: "qwe", rpass: "qwe" }, seterror);
    expect(er).toStrictEqual({ type: "loading", message: "Please wait..." });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost/api/register", {
      body: JSON.stringify({ email: "email@email.com", name: "user", pass: "qwe" }),
      method: "POST",
    });
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    expect(er).toStrictEqual({
      type: "error",
      message: <>Someting went wrong.</>,
    });
  });
});
