import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-4 flex flex-wrap">
      <div className="border-l-2 border-gray-200 border-opacity-60 px-8 py-6 md:w-full lg:w-1/3">
        <h2 className="title-font mb-2 text-lg font-medium text-gray-900 sm:text-xl">
          About this software
        </h2>
        <p className="mb-4 text-base leading-relaxed">
          Latest source code can be{" "}
          <Link href="https://github.com/scotm/lifting-t3">
            <a>found on GitHub.</a>
          </Link>
        </p>
        <a className="inline-flex items-center text-indigo-500">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="ml-2 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="border-l-2 border-gray-200 border-opacity-60 px-8 py-6 md:w-full lg:w-1/3">
        <h2 className="title-font mb-2 text-lg font-medium text-gray-900 sm:text-xl">
          Resistance Training
        </h2>
        <p className="mb-4 text-base leading-relaxed">
          Regular resistance training can decrease the risk of heart disease by
          lowering body fat, decreasing blood pressure, improving cholesterol,
          and lowering the stress placed on the heart. Muscular fitness enhances
          your quality of life.
        </p>
        <a className="inline-flex items-center text-indigo-500">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="ml-2 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="border-l-2 border-r-2 border-gray-200 border-opacity-60 px-8 py-6 md:w-full lg:w-1/3">
        <h2 className="title-font mb-2 text-lg font-medium text-gray-900 sm:text-xl">
          Tracking your gains
        </h2>
        <p className="mb-4 text-base leading-relaxed">
          That which gets measured gets improved. Nothing motivates us more than
          seeing our progress.
        </p>
        <a className="inline-flex items-center text-indigo-500">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="ml-2 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
