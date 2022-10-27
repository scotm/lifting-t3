import deadlift from "../../../public/images/deadlift.jpg";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/PageLayout/Layout";
import { UserLoginButton } from "../../components/PageLayout/Navbar";
import ShowWorkoutTemplates from "../../components/ShowWorkoutTemplates";
import { FC } from "react";

const WorkoutTemplateIndex: FC = () => {
  const { data: session } = useSession();
  return (
    <Layout title="Workout Templates">
      {!!session ? (
        <ShowWorkoutTemplates />
      ) : (
        <>
          <div className="grid grid-cols-6">
            <p className="col-span-5">
              If you were logged in, this is where your saved Workout Templates
              would be
            </p>
            <UserLoginButton />
          </div>
        </>
      )}
      <Image
        className="rounded-md"
        src={deadlift}
        width={896}
        height={483}
        alt="Deadlift - Photo by Anastase Maragos"
      />
    </Layout>
  );
};
export default WorkoutTemplateIndex;
