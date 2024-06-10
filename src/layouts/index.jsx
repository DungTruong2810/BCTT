import { Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Layout;
