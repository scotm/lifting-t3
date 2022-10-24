import { useRouter } from "next/router";
import { useState } from "react";
// import { ExerciseEditForm } from "../../../components/Forms/ExerciseEditForm";
import Layout from "../../../components/PageLayout/Layout";
import parseID from "../../../utils/parseID";

const EditWorkoutTemplate: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("Editing Workout Template");
  return (
    <Layout title={title}>
      {/* <ExerciseEditForm id={parseID(router.query.id)} setTitle={setTitle} /> */}
    </Layout>
  );
};

export default EditWorkoutTemplate;
