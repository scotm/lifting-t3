import { useSession } from "next-auth/react";
import { UserLogin } from "../../components/PageLayout/Navbar";
import Layout from "../../components/PageLayout/Layout";
import UserAccountEditForm from "../../components/Forms/UserAccountEditForm";

function ButtonOrAccountDetails() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <>Loading...</>;
  }
  if (status === "unauthenticated" || !session) {
    return <UserLogin />;
  }
  return <UserAccountEditForm />;
}

const AccountPage: React.FC = () => {
  return (
    <Layout title="Account Details">
      <ButtonOrAccountDetails />
    </Layout>
  );
};

export default AccountPage;
