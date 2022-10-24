import { useRouter } from "next/router";
import Layout from "../../components/PageLayout/Layout";
import { WorkoutTemplate } from "../../components/WorkoutTemplate";
import parseID from "../../utils/parseID";

export default function WorkoutTemplateView() {
  const router = useRouter();
  const id = parseID(router.query.id);
  if (!id || id < 0) return null;
  return (
    <Layout title={""}>
      <div className="grid grid-cols-2">
        <WorkoutTemplate id={parseID(router.query.id)} />
        <button className="col-span-1 m-6 rounded-xl bg-indigo-500 p-2 text-white shadow-xl transition duration-300 hover:bg-indigo-400">
          Let&apos;s lift!
        </button>
      </div>
    </Layout>
  );
}
