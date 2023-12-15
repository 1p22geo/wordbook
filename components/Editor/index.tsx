"use client";

import MDEditor from "@uiw/react-md-editor";
import katex from "katex";
import React, { Dispatch, SetStateAction } from "react";
import { ElementContent } from "react-markdown/lib";
import { getCodeString } from "rehype-rewrite";
import "katex/dist/katex.css";

export const Editor = ({ value, setValue }: { value: string; setValue: Dispatch<SetStateAction<string>> }) => {
  // const [value, setValue] = React.useState(mdKaTeX);
  return (
    <div className="container">
      <MDEditor
        data-color-mode="light"
        value={value}
        height={300}
        onChange={(val) => {
          if (val) setValue(val);
          else setValue("");
        }}
      />
    </div>
  );
};
