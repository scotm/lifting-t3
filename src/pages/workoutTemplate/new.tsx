import { useSession } from "next-auth/react";
import { WorkoutTemplateForm } from "../../components/Forms/WorkoutTemplateForm";
import Layout from "../../components/PageLayout/Layout";

export default function WorkoutTemplateCreate() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <Layout title="Write a New Workout Template">
      <WorkoutTemplateForm />
    </Layout>
  );
}
