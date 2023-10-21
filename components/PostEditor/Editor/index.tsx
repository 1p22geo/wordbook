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
        previewOptions={{
          components: {
            code: ({ inline, children, className, ...props }) => {
              if (!children) return;
              const txt = children[0] || "";
              if (inline) {
                if (typeof txt === "string" && /^\$\$(.*)\$\$/.test(txt)) {
                  const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, "$1"), {
                    throwOnError: false,
                  });
                  return <code dangerouslySetInnerHTML={{ __html: html }} />;
                }
                return <code>{txt}</code>;
              }
              const code =
                props.node && props.node.children
                  ? getCodeString(props.node.children as unknown as ElementContent[])
                  : txt;
              if (
                typeof code === "string" &&
                typeof className === "string" &&
                /^language-katex/.test(className.toLocaleLowerCase())
              ) {
                const html = katex.renderToString(code, {
                  throwOnError: false,
                });
                console.log("props", code, txt, className, props);
                return <code dangerouslySetInnerHTML={{ __html: html }} />;
              }
              return <code className={String(className)}>{children}</code>;
            },
          },
        }}
      />
    </div>
  );
};
