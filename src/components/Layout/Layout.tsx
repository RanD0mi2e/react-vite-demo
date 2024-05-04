import style from "./Layout.module.css";
import { Header } from "./Header";
import { MainContain } from "./MainContain";
import { SideBar } from "./SideBar";
import { Outlet } from "react-router-dom";
import Appraisal from "@/router/Appraisal.tsx";
export const Layout = () => {

  return (
      <>
          <Appraisal>
              <Header/>
              <div className={style.main}>
                  <SideBar/>
                  <MainContain>
                      <Outlet/>
                  </MainContain>
              </div>

          </Appraisal>
      </>
  );
};
