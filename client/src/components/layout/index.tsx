import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import styles from "./styles.module.scss";

const Layout = () => {
  return (
    <div className={styles.layout_wrapper}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
