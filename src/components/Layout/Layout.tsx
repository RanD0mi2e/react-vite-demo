import { Header } from "./Header";
import { MainContain } from "./MainContain";
import { SideBar } from "./SideBar";
import style from "./Layout.module.css";
import { useContext, useEffect } from "react";
import { service } from "../../utils/customFetch";
import {
  MenuType,
  UserContext,
  UserDispathContext,
} from "../../stores/user/contexts/UserContext";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const userInfo = useContext(UserContext);
  const userDispatch = useContext(UserDispathContext);
  useEffect(() => {
    // 获取菜单路由
    service.get("/v1/getMenuTree").then((resp) => {
      const tree = (resp.data as MenuType).children;
      userDispatch &&
        userDispatch({
          type: "update userMenuTree",
          menu: tree,
        });
    });
  }, [userDispatch]);

  // 树组件的处理

  return (
    <>
      <Header />
      <div className={style.main}>
        {userInfo && userInfo.menu.length && <SideBar />}
        <MainContain>
          <Outlet />
        </MainContain>
      </div>
    </>
  );
};
