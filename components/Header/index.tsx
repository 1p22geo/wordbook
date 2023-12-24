import Link from "next/link";
import { UserID } from "schemas/user";

export const Header = ({ user }: { user?: UserID }) => {
  return (
    <nav role="navigation" className="sticky top-0 z-30 flex w-full flex-col items-center">
      <input
        id="hamburgir"
        type="checkbox"
        className="peer sr-only"
        aria-label="top bar toggle"
        defaultChecked={true}
      ></input>

      <div
        id="menu"
        className="top-0 flex w-full scale-y-100 flex-col items-center gap-2 bg-white p-2 shadow-2xl  peer-checked:max-sm:hidden sm:flex-row sm:items-baseline"
      >
        <Link href="/in" className="text-xl font-bold sm:pr-8">
          WordBook
        </Link>
        <Link href={"#"} className="mx-4 text-primary-600 hover:underline">
          About
        </Link>
        <Link href={"#"} className="mx-4 text-primary-600 hover:underline">
          Contact
        </Link>
        <Link href={"#"} className="mx-4 text-primary-600 hover:underline">
          Support
        </Link>
        {user ? (
          <div className="flex flex-row flex-wrap items-center justify-center sm:ml-auto">
            <h3 className="hidden text-sm font-bold sm:mr-4 sm:block">{user.name}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mt-4 h-8 w-full sm:mt-0 sm:w-8">
              <circle cx="12" cy="12" r="10" className="fill-primary-600" />
              <path
                className="fill-primary-100"
                d="M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
              />
            </svg>
            <input type="checkbox" id="cb" className="peer sr-only"></input>
            <label
              htmlFor="cb"
              className="hidden w-full cursor-pointer place-content-center duration-200 peer-checked:scale-y-[-1] sm:grid sm:w-fit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8">
                <path
                  className="fill-secondary-600"
                  fillRule="evenodd"
                  d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
                />
              </svg>
            </label>
            <div className="flex w-48 origin-top flex-col items-center p-2 duration-200 sm:absolute sm:-translate-x-8 sm:translate-y-32 sm:scale-y-[0] sm:bg-secondary-200 sm:shadow-2xl sm:peer-checked:scale-y-100">
              <h2>{user.name}</h2>
              <h3 className="mb-4 text-sm">&lt;{user.email}&gt;</h3>
              <Link href={"/in/user"} className="text-primary-600 hover:underline">
                Edit profile
              </Link>
              <Link href={"#"} className="text-primary-600 hover:underline">
                App settings
              </Link>
              <Link href={"#"} className="text-primary-600 hover:underline">
                Account settings
              </Link>

              <a href={"/api/logout"} className=" mt-4 self-end text-vividred-600 hover:underline">
                {/* not Link, we don't want to prefetch logout */}
                Log out
              </a>
            </div>
          </div>
        ) : (
          <>
            <Link
              href={"/login"}
              className="mt-4 box-border rounded-sm border-2 border-primary-600 p-1 px-2 text-primary-600 sm:ml-auto sm:mt-0"
              title="log in"
            >
              Log in
            </Link>
            <Link href={"/signup"} className="rounded-sm bg-primary-600 p-1 px-2 text-white" title="register">
              Register
            </Link>
          </>
        )}
      </div>
      <label
        id="switch"
        role="button"
        htmlFor="hamburgir"
        aria-label="switch for the top bar"
        className="grid w-full cursor-pointer place-content-center duration-200  peer-checked:scale-y-[-1] sm:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8">
          <path
            className="fill-secondary-600"
            fillRule="evenodd"
            d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
          />
        </svg>
      </label>
    </nav>
  );
};
