"use client";
import { ReactNode, useState } from "react";
import { PageSwitcher } from "components/PageSwitcher";

export const StepForm = ({ pages }: { pages: ReactNode[] }) => {
  const [page, setpage] = useState(0);
  const maxPages = pages.length;

  return (
    <div>
      {pages[page]}
      <PageSwitcher maxPages={maxPages} page={page} setPage={setpage} />
    </div>
  );
};
