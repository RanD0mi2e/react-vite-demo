import style from "./Layout.module.css";
import { Header } from "./Header";
import { MainContain } from "./MainContain";
import { SideBar } from "./SideBar";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <>
      <Header />
      <div className={style.main}>
        <SideBar />
        <MainContain>
          <Outlet />
        </MainContain>
      </div>
    </>
  );
};
