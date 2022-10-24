import { FC } from "react";
import { trpc } from "../utils/trpc";

type WorkoutTemplateProps = {
  id: number;
};

export const WorkoutTemplate: FC<WorkoutTemplateProps> = (props) => {
  const { id } = props;
  const { data: template } = trpc.workoutTemplates.findByID.useQuery(id);
  if (!template) return null;
  return (
    <div className="p-2">
      {template.pieces.map((e) => {
        return (
          <section key={e.id}>
            <div className="font-semibold">{e.exercise.name}</div>
            <div>
              {e.rep_pair.length} sets:{" "}
              {e.rep_pair
                .map((f) => {
                  return f.reps;
                })
                .join(", ")}
            </div>
          </section>
        );
      })}
    </div>
  );
};
