export const PageSwitcher = ({
  maxPages,
  page,
  setPage,
}: {
  maxPages: number;
  page: number;
  setPage: (page: number) => void;
}) => {
  const numbers = [];
  for (let i = 0; i < maxPages; i++) {
    numbers.push(i);
  }
  return (
    <span className="mt-8 flex flex-row  items-center justify-center justify-items-center gap-2">
      {numbers.map((number, i) => {
        return [
          <div
            key={"number-" + i}
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
            <div className="" key={"chevron-" + i}>
              &gt;
            </div>
          ),
        ];
      })}
    </span>
  );
};
