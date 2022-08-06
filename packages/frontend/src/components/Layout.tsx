import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import UploadModal from "./UploadModal";

const Layout = () => {
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <Header />
      <Outlet />
      <Footer />
      <UploadModal />
    </div>
  );
};

export default Layout;

