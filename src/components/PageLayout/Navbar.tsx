/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import Link from "next/link";

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
              My Account
            </a>
          </Link>
        );
      return <div>Authenticated</div>;
  }
  return <UserLogin />;
}

export default function Navbar() {
  return (
    <header className="text-gray-700 font-bold">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" passHref>
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src="/logo.svg" alt="" className="w-12 h-12" />
            <span className="ml-3 text-xl">Lifting</span>
          </a>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/exercises" passHref>
            <a className="mr-5 hover:text-gray-900">Exercises</a>
          </Link>
          <a href="" className="mr-5 hover:text-gray-900">
            Contact Us
          </a>
          {/* <a className="mr-5 hover:text-gray-900">Third Link</a>
          <a className="mr-5 hover:text-gray-900">Fourth Link</a> */}
        </nav>
        <button className="inline-flex items-center bg-indigo-100 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-200 rounded text-base mt-4 md:mt-0">
          <UserLoginButton />
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
