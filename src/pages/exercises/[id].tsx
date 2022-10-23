import { useRouter } from "next/router";
import { Exercise } from "../../components/Exercise/Exercise";
import Layout from "../../components/PageLayout/Layout";
import parseID from "../../utils/parseID";
import { trpc } from "../../utils/trpc";

export default function ExerciseView() {
  const router = useRouter();
  const id = parseID(router.query.id);
  const {
    data: exercise,
    isLoading,
    error,
  } = trpc.exercises.findByID.useQuery(id, { refetchOnWindowFocus: false });
  if (error) return <div>There&lsquo;s an error here: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (exercise)
    return (
      <Layout title={exercise.name}>
        <Exercise exercise={exercise} edit={true} show_description={true} />
      </Layout>
    );
}
