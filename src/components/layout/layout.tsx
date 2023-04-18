import styles from './layout.module.css'
import { Outlet } from "react-router-dom";
import AppHeader from "../app-header/app-header";

const Layout = () => {

  return (
    <>
      <AppHeader/>
      <main className={styles.layout}>
        <Outlet/>
      </main>
    </>
  )
};

export default Layout;
