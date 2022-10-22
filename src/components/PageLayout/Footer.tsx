import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-4 flex flex-wrap">
      <div className="lg:w-1/3 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
          About this software
        </h2>
        <p className="leading-relaxed text-base mb-4">
          Latest source code can be{" "}
          <Link href="https://github.com/scotm/lifting-toy-nextjs">
            <a>found on GitHub.</a>
          </Link>
        </p>
        <a className="text-indigo-500 inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="lg:w-1/3 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
          Resistance Training
        </h2>
        <p className="leading-relaxed text-base mb-4">
          Regular resistance training can decrease the risk of heart disease by
          lowering body fat, decreasing blood pressure, improving cholesterol,
          and lowering the stress placed on the heart. Muscular fitness enhances
          your quality of life.
        </p>
        <a className="text-indigo-500 inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="lg:w-1/3 md:w-full px-8 py-6 border-l-2 border-r-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
          Tracking your gains
        </h2>
        <p className="leading-relaxed text-base mb-4">
          That which gets measured gets improved. Nothing motivates us more than
          seeing our progress.
        </p>
        <a className="text-indigo-500 inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
