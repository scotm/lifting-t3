import { trpc } from "../../utils/trpc";

type ExerciseCategorySelectProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function ExerciseCategorySelect(
  props: ExerciseCategorySelectProps
) {
  const { isLoading, error, data } = trpc.categories.getAll.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );
  const { category, setCategory } = props;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred</div>;

  if (data !== undefined) {
    return (
      <select
        className="m-2 w-full border-2 border-slate-800 p-0.5"
        onChange={(event) => setCategory(event.target.value)}
        defaultValue={category}
      >
        {data.map((category) => (
          <option key={category.id}>{category.name}</option>
        ))}
      </select>
    );
  } else {
    return null;
  }
}
