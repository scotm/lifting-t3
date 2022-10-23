/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function UserLogin() {
  return (
    <Link href="/api/auth/signin">
      <a className="rounded py-2 px-2 text-lg transition duration-300">
        Sign In
      </a>
    </Link>
  );
}

export function UserLoginButton() {
  const { data: session, status } = useSession();
  switch (status) {
    case "loading":
      return <div>Loading...</div>;
    case "authenticated":
      if (session.user)
        return (
          <Link href="/account/">
            <a className="rounded py-2 px-2 text-lg transition duration-300">
              {session.user.name}
            </a>
          </Link>
        );
      return <div>Authenticated</div>;
  }
  return <UserLogin />;
}

export default function Navbar() {
  return (
    <header className="font-bold text-gray-700">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <Link href="/" passHref>
          <a className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
            <img src="/logo.svg" alt="" className="h-12 w-12" />
            <span className="ml-3 text-xl">Lifting</span>
          </a>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
          <Link href="/exercises" passHref>
            <a className="mr-5 hover:text-gray-900">Exercises</a>
          </Link>
          <a href="" className="mr-5 hover:text-gray-900">
            Contact Us
          </a>
          {/* <a className="mr-5 hover:text-gray-900">Third Link</a>
          <a className="mr-5 hover:text-gray-900">Fourth Link</a> */}
        </nav>
        <button className="mt-4 inline-flex items-center rounded border-0 bg-indigo-100 py-1 px-3 text-base hover:bg-indigo-200 focus:outline-none md:mt-0">
          <UserLoginButton />
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
