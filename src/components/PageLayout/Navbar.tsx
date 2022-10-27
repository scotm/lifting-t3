/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

export const UserLogin: FC = () => {
  return (
    <Link href="/api/auth/signin">
      <a className="rounded bg-indigo-200 py-3 px-3 text-center text-lg font-bold shadow-lg transition duration-300 hover:bg-indigo-300">
        Sign In
      </a>
    </Link>
  );
};

export const LogoutButton: FC = () => (
  <button
    className="rounded bg-indigo-200 py-3 px-3 text-lg transition duration-300 hover:bg-indigo-300"
    onClick={() => signOut()}
  >
    Sign out
  </button>
);

export const UserLoginButton: FC = () => {
  const { data: session, status } = useSession();
  switch (status) {
    case "loading":
      return <div>Loading...</div>;
    case "authenticated":
      if (session.user)
        return (
          <>
            <Link href="/account/">
              <a className="rounded bg-indigo-200 py-3 px-3 text-center text-lg transition duration-300 hover:bg-indigo-300">
                {session.user.name ?? "Account"}
              </a>
            </Link>
            &nbsp;
            <LogoutButton />
          </>
        );
      return <div>Authenticated</div>;
  }
  return <UserLogin />;
};

export default function Navbar() {
  const { data: session, status } = useSession();
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
          {status === "authenticated" && (
            <Link href="/workoutTemplate" passHref>
              <a className="mr-5 hover:text-gray-900">Workout Templates</a>
            </Link>
          )}
          {/* 
          <a className="mr-5 hover:text-gray-900">Fourth Link</a> */}
        </nav>
        <div className="mt-4 inline-flex items-center rounded border-0  py-1 px-3 text-base  focus:outline-none md:mt-0">
          <UserLoginButton />
        </div>
      </div>
    </header>
  );
}
