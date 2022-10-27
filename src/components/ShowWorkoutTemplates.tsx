import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { trpc } from "../utils/trpc";

const UnwrappedWorkoutTemplates: FC = () => {
  const { data: template } = trpc.workoutTemplates.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (!template) {
    return null;
  }
  return (
    <div className="my-4">
      <h2 className="text-center text-3xl font-bold underline">
        Workout Templates
      </h2>
      <p>
        <Link href={"/workoutTemplate/new"}>
          <a className="float-right rounded-xl bg-indigo-500 py-2 px-4 text-white shadow-xl transition duration-300 hover:bg-indigo-400">
            + Template
          </a>
        </Link>
      </p>
      <div className="mt-8 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {template.map((e) => {
          return (
            <div className="border-2 border-indigo-500 p-2" key={e.id}>
              <h3 className="text-center text-2xl font-bold underline">
                <Link href={`/workoutTemplate/${e.id}`}>
                  <a>{e.name}</a>
                </Link>
              </h3>
              <ul>
                {e.pieces.map((j) => (
                  <li key={j.exerciseId}>
                    {j.rep_pair.length} x {j.exercise.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function ShowWorkoutTemplates() {
  const { data: session } = useSession();
  if (!session) return null;
  return <UnwrappedWorkoutTemplates />;
}
