import { ReactNode } from "react";

export type alertType = "error" | "info" | "warning" | "success" | "loading";

export type alertMessage = {
  type: alertType | null;
  message: ReactNode;
};

export const Alert = ({ children, type }: { children: ReactNode; type: alertType }) => {
  switch (type) {
    case "error":
      return (
        <div
          role="alert"
          title="alert"
          className="flex flex-row flex-nowrap items-center border-l-8 border-vividred-600 bg-vividred-300 p-4 text-vividred-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-4 w-8">
            <circle cx="12" cy="12" r="10" className="fill-vividred-600" />
            <path
              className="fill-vividred-300"
              d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"
            />
          </svg>
          <div className="text-xl font-bold">{children}</div>
        </div>
      );
    case "warning":
      return (
        <div
          role="alert"
          title="alert"
          className="flex flex-row flex-nowrap items-center border-l-8 border-vividyellow-600 bg-vividyellow-300 p-4 text-vividyellow-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-4 w-8">
            <path className="fill-vividyellow-600" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
            <path
              className="fill-vividyellow-300"
              d="M12 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.9c-.13 1.2-1.88 1.2-2 0l-.5-5a1 1 0 0 1 1-1.1h1a1 1 0 0 1 1 1.1l-.5 5z"
            />
          </svg>
          <div className="text-xl font-bold">{children}</div>
        </div>
      );
    case "success":
      return (
        <div
          role="alert"
          title="alert"
          className="flex flex-row flex-nowrap items-center border-l-8 border-teal-600 bg-teal-300 p-4 text-teal-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-4 w-8">
            <circle cx="12" cy="12" r="10" className="fill-teal-600" />
            <path
              className="fill-teal-300"
              d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
            />
          </svg>
          <div className="text-xl font-bold">{children}</div>
        </div>
      );
    case "loading":
      return (
        <div
          role="alert"
          title="alert"
          className="flex flex-row flex-nowrap items-center border-l-8 border-teal-600 bg-teal-300 p-4 text-teal-800"
        >
          <div className="mr-4 h-8 w-8 animate-spin rounded-full bg-teal-600">
            <div className="ml-2 mr-4 mt-2 h-4 w-4 rounded-full bg-teal-300"></div>
            <div className="ml-3.5 h-2 w-1 bg-teal-300"></div>
          </div>
          <div className="text-xl font-bold">{children}</div>
        </div>
      );
    default:
      return (
        <div
          role="alert"
          title="alert"
          className="flex flex-row flex-nowrap items-center border-l-8 border-lightblue-600 bg-lightblue-300 p-4 text-lightblue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-4 w-8">
            <path className="fill-lightblue-600" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
            <path
              className="fill-lightblue-300"
              d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            />
          </svg>
          <div className="text-xl font-bold">{children}</div>
        </div>
      );
  }
};
