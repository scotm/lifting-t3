// import { useRouter } from "next/router";
// import { WorkoutTemplateForm } from "../../../components/Forms/WorkoutTemplateForm";
import Layout from "../../../components/PageLayout/Layout";
// import parseID from "../../../utils/parseID";

const EditWorkoutTemplate: React.FC = () => {
  // const router = useRouter();
  return (
    <Layout title="Edit Workout Template">
      {/* <WorkoutTemplateForm id={parseID(router.query.id)} /> */}
    </Layout>
  );
};

export default EditWorkoutTemplate;
