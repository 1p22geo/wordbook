"use client";
import { useState } from "react";
import { responseJSON } from "app/api/login/route";
import { Alert, alertMessage } from "components/Alert";

const LoginForm = () => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const [error, seterror] = useState<alertMessage>({ type: null, message: "" });
  return (
    <>
      <div key={1} className=" grid grid-cols-2 items-center gap-4">
        <label htmlFor="email" className="text-lg font-bold">
          E-mail:{" "}
        </label>
        <input
          id="email"
          type="email"
          className="rounded-md  border-2 border-secondary-700 p-1"
          value={email}
          onChange={(ev) => {
            setemail(ev.currentTarget.value);
          }}
        ></input>
        <label htmlFor="password" className="text-lg font-bold">
          Password:{" "}
        </label>
        <input
          id="password"
          type="password"
          className="rounded-md border-2 border-secondary-700 p-1"
          value={pass}
          onChange={(ev) => {
            setpass(ev.currentTarget.value);
          }}
        ></input>
      </div>
      {error.type ? <Alert type={error.type}>{error.message}</Alert> : null}
      <div
        className="mt-8 cursor-pointer rounded-xl bg-primary-600 p-2 text-secondary-200 hover:bg-primary-500"
        onClick={() => {
          if (!email || !pass) {
            seterror({ type: "warning", message: "Please type in your email and password" });
            return;
          }

          fetch(`${window.location.protocol}//${window.location.host}/api/login`, {
            method: "POST",
            body: JSON.stringify({
              email: email,
              pass: pass,
            }),
          }).then((res) => {
            if (!res.ok) {
              seterror({ type: "error", message: "Wrong email or password" });
              return;
            }
            res.json().then((json) => {
              const data = json as responseJSON;
              alert(data.session);
            });
          });
        }}
      >
        Sumbit!
      </div>
    </>
  );
};

export default LoginForm;
