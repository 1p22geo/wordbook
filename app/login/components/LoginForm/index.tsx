"use client";
import { useState } from "react";

const LoginForm = () => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
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
      <div
        className="mt-8 cursor-pointer rounded-xl bg-primary-600 p-2 text-secondary-200 hover:bg-primary-500"
        onClick={() => {
          alert("Login");
        }}
      >
        Sumbit!
      </div>
    </>
  );
};

export default LoginForm;
