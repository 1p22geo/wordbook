"use client";
import { useReducer, useState } from "react";
import { getNextDisabled } from "app/signup/getNextDisabled";
import { Alert, alertMessage } from "components/Alert";
import { StepForm } from "components/StepForm";
import { init_state, reducer } from "../../reducer";
import { sumbit } from "../../sumbit";

const LoginForm = () => {
  const [state, dispatch] = useReducer(reducer, init_state);
  const [page, setpage] = useState(0);
  const [error, seterror] = useState<alertMessage>({ type: null, message: "" });

  return (
    <StepForm
      page={page}
      setpage={setpage}
      pages={[
        <div key={1} className="grid grid-cols-2 items-center gap-4">
          <h2 className="col-span-2 text-xl">But first, we&apos;ll ask some questions</h2>
          <label htmlFor="email" className="text-lg font-bold">
            What&apos;s your e-mail address:{" "}
          </label>
          <input
            id="email"
            type="email"
            className="rounded-md  border-2 border-secondary-700 p-1"
            value={state.email}
            onChange={(ev) => {
              dispatch({ type: "change_email", payload: ev.currentTarget.value });
            }}
          ></input>
        </div>,

        <div key={2} className="grid grid-cols-2 items-center gap-4">
          <label htmlFor="name" className="text-lg font-bold">
            What&apos;s your name:{" "}
          </label>
          <input
            id="name"
            type="text"
            className="rounded-md  border-2 border-secondary-700 p-1"
            value={state.name}
            onChange={(ev) => {
              dispatch({ type: "change_name", payload: ev.currentTarget.value });
            }}
          ></input>
        </div>,

        <div key={3} className="grid grid-cols-2 items-center gap-4">
          <label htmlFor="pass" className="text-lg font-bold">
            Set a secure password:{" "}
          </label>
          <input
            id="pass"
            type="password"
            className="rounded-md  border-2 border-secondary-700 p-1"
            value={state.pass}
            onChange={(ev) => {
              dispatch({ type: "change_pass", payload: ev.currentTarget.value });
            }}
          ></input>
          <label htmlFor="rpass" className="text-lg font-bold">
            Repeat the password for security:{" "}
          </label>
          <input
            id="rpass"
            type="password"
            className="rounded-md  border-2 border-secondary-700 p-1"
            value={state.rpass}
            onChange={(ev) => {
              dispatch({ type: "change_rpass", payload: ev.currentTarget.value });
            }}
          ></input>
        </div>,

        <div key={4} className=" flex flex-col content-center items-center justify-items-center gap-4">
          {error.type ? (
            <div id="alert">
              <Alert type={error.type}>{error.message}</Alert>
            </div>
          ) : (
            <h2 className="col-span-2 text-xl">All done!</h2>
          )}
          <div
            className="cursor-pointer rounded-xl bg-primary-600 p-4 text-2xl text-secondary-100 hover:bg-primary-500"
            onClick={() => {
              sumbit(state, seterror);
            }}
          >
            Submit!
          </div>
        </div>,
      ]}
      nextDisabled={getNextDisabled(state, page)}
    />
  );
};

export default LoginForm;
