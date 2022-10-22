import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Navbar />
      <div className="mx-auto mt-8 max-w-4xl">
        <h1 className="text-center text-4xl font-extrabold">
          {title ?? "Default Title"}
        </h1>
        {children ?? ""}
        <Footer></Footer>
      </div>
    </>
  );
};

export default Layout;
