import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div style={{ backgroundColor: "#F5F5F5" }} >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;