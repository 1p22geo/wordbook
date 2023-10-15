import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start bg-secondary-200">
        <div className="flex h-[40vh] w-screen flex-col items-center justify-center bg-primary-800 p-4 text-center text-secondary-200 lg:h-[60vh]">
          <h1 className="pb-8 text-3xl md:text-6xl">WordBook - the Internet redefined</h1>
          <h2 className="text-lg md:text-2xl">We merged Facebook and Wordpress and now we feel smug about it&trade;</h2>
        </div>
        <Link
          href={"/signup"}
          className="z-10 mt-[-3.5rem] rounded-full bg-primary-500 p-8 text-5xl text-secondary-200"
        >
          Sign up
        </Link>
        <Link href={"/login"} className="z-20 font-bold text-primary-800 hover:underline">
          Or log in if you have an account
        </Link>
        <div className="mt-[-3.5rem] grid w-screen grid-cols-2 pt-20">
          <div className="grid place-content-center p-4 text-xl">
            <div>
              Usually, when a bakery or other shop wanted to be present on the Internet, they had to sign up on social
              media (that&apos;s easy enough) and create a webpage - either hire someone to write in HTML or other
              language, or install Wordpress and create the webpage themselves. Both of these are{" "}
              <mark className="bg-primary-300 px-1 font-bold">difficult</mark>, they require a server, a domain for
              hosting, and a lot of setup.
            </div>
          </div>
          <div className="grid place-content-center p-4">
            <Image
              src="/static/computer_programming.jpg"
              alt="Difficult computer programming"
              width={456}
              height={350}
            />
          </div>
        </div>
        <div className=" grid w-screen grid-cols-2  pt-16">
          <div className="grid place-content-center p-4">
            <Image src="/static/computer.jpg" alt="Easy Wordbook usage" width={266} height={189} />
          </div>
          <div className="grid place-content-center p-4  text-xl">
            <div>
              But now, all they need to do is sign up at Wordbook, and they will get a webpage within our server, which
              they can edit in thier browser - like in Wordpress, and an account which they can post something on, and
              have a photo galerry - just like on Facebook. It&apos;s{" "}
              <mark className="bg-primary-300 px-1 font-bold">simple</mark> - you can try yourself, if you sign up{" "}
              <Link href={"/signup"} className="text-primary-500 hover:underline">
                here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
