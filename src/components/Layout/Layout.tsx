import { Header } from "./Header";
import { MainContain } from "./MainContain";
import { SideBar } from "./SideBar";
import style from "./Layout.module.css";
import { ReactNode, useContext, useEffect } from "react";
import { service } from "../../utils/customFetch";
import { MenuType, UserContext, UserDispathContext } from "../../stores/user/contexts/UserContext";

export const Layout = ({ children }: { children: ReactNode }) => {
  const userInfo = useContext(UserContext)
  const userDispatch = useContext(UserDispathContext)
  useEffect(() => {
    // 获取菜单路由
    service.get('/v1/getMenuTree').then(resp => {
      const tree = (resp.data as MenuType).children
      userDispatch && userDispatch({
        type: "update userMenuTree",
        menu: tree
      })
    })
  }, [userDispatch])

  // 树组件的处理

  return (
    <>
      <Header />
      <div className={style.main}>
        {userInfo && userInfo.menu.length && <SideBar />}
        <MainContain>
          {children}
        </MainContain>
      </div>
    </>
  );
};
