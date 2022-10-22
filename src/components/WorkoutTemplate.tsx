import { AppRouterTypes } from "../utils/trpc";
import { ArrElement } from "../utils/typescript";

type WorkoutTemplateProps = {
  template: ArrElement<AppRouterTypes["workoutTemplates"]["getAll"]["output"]>;
};

export default function WorkoutTemplate(props: WorkoutTemplateProps) {
  const template = props.template;
  console.log(template);
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
}
