import { Dispatch, SetStateAction } from "react";

export const PageSwitcher = ({
  maxPages,
  page,
  setPage,
  nextDisabled,
}: {
  maxPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  nextDisabled?: boolean;
}) => {
  const numbers = [];
  for (let i = 0; i < maxPages; i++) {
    numbers.push(i);
  }
  return (
    <div className="flex flex-col items-center gap-2">
      {page === maxPages - 1 ? (
        <div className="py-2" />
      ) : (
        <div
          className={`${
            nextDisabled ? "cursor-not-allowed" : "cursor-pointer"
          } mt-8 w-fit select-none self-center rounded-xl ${
            nextDisabled ? "bg-primary-300" : "bg-primary-600"
          } p-2 text-lg text-secondary-200 ${nextDisabled ? "" : "hover:bg-primary-500"}`}
          onClick={
            nextDisabled
              ? undefined
              : () => {
                  setPage((p) => (p === maxPages - 1 ? p : p + 1));
                }
          }
        >
          next &gt;
        </div>
      )}

      <span className=" flex flex-row  items-center justify-center justify-items-center gap-2">
        {numbers.map((number, i) => {
          return [
            <div
              key={"number-" + i.toString()}
              onClick={() => {
                setPage(number);
              }}
              className={`cursor-pointer text-secondary-600 hover:text-secondary-800 hover:underline ${
                number === page ? "font-bold text-secondary-900" : ""
              }`}
            >
              {number + 1}
            </div>,
            number === maxPages - 1 ? null : (
              <div className="" key={"chevron-" + i.toString()}>
                &gt;
              </div>
            ),
          ];
        })}
      </span>
    </div>
  );
};
