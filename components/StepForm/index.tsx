"use client";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { PageSwitcher } from "components/PageSwitcher";

export const StepForm = ({
  pages,
  nextDisabled,
  page,
  setpage,
}: {
  pages: ReactNode[];
  nextDisabled?: boolean;
  page: number;
  setpage: Dispatch<SetStateAction<number>>;
}) => {
  const maxPages = pages.length;

  return (
    <div>
      {pages[page]}
      <PageSwitcher maxPages={maxPages} page={page} setPage={setpage} nextDisabled={nextDisabled} />
    </div>
  );
};
