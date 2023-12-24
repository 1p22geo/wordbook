import { Metadata } from "next";
import LoginForm from "./components/LoginForm";
export const metadata: Metadata = {
  title: "WordBook | Log in to WordBook",
  description: "Log in to Wordbook",
};

const Page = () => {
  return (
    <main className="grid h-screen w-screen place-content-center bg-secondary-200">
      <div className="m-4 flex flex-col items-center rounded-xl bg-primary-200 p-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl">Welcome back!</h1>
          <h2 className="text-lg">Log in to your account</h2>
        </div>
        <LoginForm />
      </div>
    </main>
  );
};

export default Page;
