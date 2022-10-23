import Link from "next/link";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { AppRouterTypes } from "../../utils/trpc";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import ExerciseAdditional from "./ExerciseAdditional";

const youtube_regex = new RegExp(
  /https:\/\/www.youtube.com\/watch\?v=([0-9a-zA-Z]+)$/
);
function swap_youtube_links(mystring: string) {
  return mystring.replace(
    youtube_regex,
    '<iframe width="420" height="315" src="//www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'
  );
}

type ExerciseProps = {
  exercise: AppRouterTypes["exercises"]["findByID"]["output"];
  edit?: boolean;
  show_description?: boolean;
  link_to?: boolean;
};

export const Exercise: FC<ExerciseProps> = (props) => {
  const { exercise: e, edit, show_description, link_to } = props;
  if (!e) return <></>;
  return (
    <div key={e.id} className="p-4">
      {link_to ? (
        <Link href={`/exercises/${e.id}`} passHref={true}>
          <a>
            <h3 className="text-3xl font-bold">{e.name}</h3>
          </a>
        </Link>
      ) : (
        <h3 className="text-3xl font-bold">{e.name}</h3>
      )}

      {edit ? (
        <p className="float-right">
          <Link href={`/exercises/edit/${e.id}`} passHref={true}>
            <a>
              <PencilSquareIcon className="h-8 w-8 text-indigo-500" />
            </a>
          </Link>
        </p>
      ) : (
        <></>
      )}
      <div>
        {show_description ? (
          <div className="exercise-description">
            <ReactMarkdown>{swap_youtube_links(e.description)}</ReactMarkdown>
          </div>
        ) : (
          <></>
        )}
        <hr />
        <div className="grid grid-cols-3 gap-4">
          <ExerciseAdditional
            precursor="Muscles Used: "
            named={e.muscles}
          ></ExerciseAdditional>
          <ExerciseAdditional
            precursor="Equipment: "
            named={e.equipment}
          ></ExerciseAdditional>
          <ExerciseAdditional
            precursor="Author: "
            named={
              e.license_author !== undefined
                ? [{ name: e.license_author }]
                : undefined
            }
          ></ExerciseAdditional>
        </div>
      </div>
    </div>
  );
};
