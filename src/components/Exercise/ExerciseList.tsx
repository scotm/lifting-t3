import { trpc } from "../../utils/trpc";
import Exercise from "./Exercise";

type ExerciseListProps = {
  edit?: boolean;
  show_description?: boolean;
  exercise_onclick?: (arg0: Event) => void;
  category: string;
  search: string;
};

export default function ExerciseList(props: ExerciseListProps) {
  let { edit, show_description } = props;
  const { category, search } = props;
  const {
    isLoading,
    error,
    data: exercises,
  } = trpc.exercises.getFiltered.useQuery({
    category: category,
    search: search,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <div>There was an error getting the list of exercises.</div>;
  }
  if (!exercises) {
    return <></>;
  }
  edit = edit === undefined ? true : edit;
  show_description = show_description === undefined ? true : show_description;
  return (
    <>
      {exercises.length > 0 ? (
        exercises.map((e) => {
          return (
            <Exercise
              edit={edit}
              show_description={show_description}
              key={e.id}
              exercise={e}
              link_to={true}
            />
          );
        })
      ) : (
        <h5 className="p-11">No Matching Exercises Found</h5>
      )}
    </>
  );
}
