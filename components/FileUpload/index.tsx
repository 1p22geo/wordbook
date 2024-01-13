"use client";

import { ChangeEvent } from "react";

export default function FileUploader(props: {
  uploadedCallback?: (filename: string) => Promise<void>;
  refresh?: boolean;
}) {
  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data: { fileUrl: string } = (await res.json()) as { fileUrl: string };
      if (props.uploadedCallback) await props.uploadedCallback(data.fileUrl);
      if (props.refresh) window.location.reload();
    } catch (error) {
      console.error("something went wrong, check your console.");
    }

    /** Reset file input */
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <input
      type="file"
      aria-label="add a file"
      onChange={onImageFileChange}
      className="rounded-md bg-secondary-800 p-8 text-xl text-white shadow-inner shadow-secondary-500"
    />
  );
}
