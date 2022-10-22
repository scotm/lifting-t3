import { useRouter } from "next/router";
import { useState } from "react";
import { ExerciseEditForm } from "../../../components/Forms/ExerciseEditForm";
import Layout from "../../../components/PageLayout/Layout";
import parseID from "../../../utils/parseID";

const EditExercise: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("Editing ");
  return (
    <Layout title={title}>
      <ExerciseEditForm id={parseID(router.query.id)} setTitle={setTitle} />
    </Layout>
  );
};

export default EditExercise;
