import { Metadata } from "next";
import LoginForm from "./components/LoginForm";

export const metadata: Metadata = {
  title: "WordBook | Sign up to WordBook",
  description: "Sign up to Wordbook",
};

const Page = () => {
  return (
    <>
      <div className="grid h-screen w-screen place-content-center bg-secondary-200">
        <div className="flex flex-col items-center rounded-xl bg-primary-200 m-4  p-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl">Welcome to Wordbook</h1>
            <h2 className="text-lg">We&apos;re sure you&apos;ll like it here</h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Page;
