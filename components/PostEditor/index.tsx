"use client";

import { useState } from "react";
import { Alert, alertMessage } from "components/Alert";
import { Editor } from "components/Editor";
import FileUploader from "components/FileUpload";
import { submit } from "./submit";

export const PostEditor = (props?: { submit?: typeof submit }) => {
  const [value, setvalue] = useState("");
  const [alert, setalert] = useState<alertMessage>({ type: null, message: "" });
  return (
    <div className="flex max-w-[1000px] flex-col items-end gap-4 px-4">
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
      {alert.type ? <Alert type={alert.type}>{alert.message}</Alert> : null}
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
            setalert({ type: "loading", message: "Please wait..." });
            if (props?.submit) {
              void props.submit(value, setalert);
            } else {
              void submit(value, setalert);
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostEditor;
