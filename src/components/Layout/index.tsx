import { Header } from "./Header";
import { MainContain } from "./MainContain";
import { SideBar } from "./SideBar";
import style from "./Layout.module.css";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className={style.main}>
        <SideBar />
        <MainContain>
          {children}
        </MainContain>
      </div>
    </>
  );
};
