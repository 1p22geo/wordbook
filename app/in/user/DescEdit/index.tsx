"use client"

import { useState } from "react";
import { Alert, alertMessage } from "components/Alert";
import { Editor } from "components/Editor";
import FileUploader from "components/FileUpload";

export const DescriptionEditor = ({
  current,
  submit,
  session,
}: {
  current: string;
  session: string;
  submit: (msg: string, session: string) => Promise<void>;
}) => {
  const [visible, setvisible] = useState(false);
  const [value, setvalue] = useState(current);
  const [alertMessage, setAlertMessage] = useState<alertMessage>({ type: null, message: "" });
  return (
    <>
      <h3 className="text-lg font-semibold">Account description</h3>
      <button
        onClick={() => {
          setvisible((v) => !v);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6">
          <path
            className="fill-secondary-600"
            d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"
          />
          <rect width="20" height="2" x="2" y="20" className="fill-secondary-600" rx="1" />
        </svg>
      </button>
      {visible && (
        <>
          <div className="w-full shrink-0 flex flex-col px-4 gap-4 items-end">
            <div className="flex flex-col items-start self-start p-8 font-light">
        <span>Upload an image: </span>
        <FileUploader
          uploadedCallback={(filename: string) =>
            new Promise((resolve) => {
              setvalue((v) => v + `![${filename}](/api/image/${filename})`);
              resolve();
            })
          }
        />
      </div>
            <Editor value={value} setValue={setvalue} />
            {alertMessage.type ? <Alert type={alertMessage.type}>{alertMessage.message}</Alert> : null}
            <div className="m-8 flex gap-4 self-end">
              <button
                className="box-border rounded-md border-2 border-primary-500 p-2 text-primary-500"
                onClick={() => {
                  setvalue("");
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-primary-500 p-2 text-white"
                onClick={() => {
                  if (!value) return;
                  setAlertMessage({ type: "loading", message: "Please wait..." });
                  submit(value, session).then(
                    () => {
                      window.location.reload();
                    },
                    () => {
                      setAlertMessage({ type: "error", message: "Something went wrong" });
                    }
                  );
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
