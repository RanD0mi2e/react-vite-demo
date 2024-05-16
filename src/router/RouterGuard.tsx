import { getMenuTree } from "@/api/user";
import { useRoutesInfo } from "@/stores/router/useRouter";
import { useUserInfo } from "@/stores/user/useUserInfo";
import { UserActionTypes } from "@/stores/user/reducers/userReducer";
import { getToken } from "@/utils/token";
import { Routes as defaultRoutes } from "@/router";
import { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { addRoutes, filterRoutes } from "./routerHelpers";
import _ from "lodash";

export const RouterGuard = () => {
  // 用户信息和路由信息
  const [userInfo, userInfoDispatch] = useUserInfo();
  const [routes, routesDispatch] = useRoutesInfo();
  const element = useRoutes(routes);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 从内存/缓存获取token
    const token = getToken();
    // token不为空，且用户菜单为空时，首次请求用户菜单
    if (token && userInfo.menu.length === 0) {
      getMenuTree()
        .then(({ code, data, message }) => {
          if (code === 0) {
            // 更新菜单
            userInfoDispatch({
              type: UserActionTypes.UPDATE_USER_MENU,
              menu: data,
            });
            // 这个地方深拷贝一定要小心，如果拷贝把Component函数丢失了会导致渲染失败
            const result = addRoutes(
              _.cloneDeep(defaultRoutes),
              filterRoutes(data)
            );

            // 更新路由
            routesDispatch({
              type: "dispatch",
              data: {
                routes: result,
              },
            });
          } else {
            throw new Error(message);
          }
        })
        .catch((error) => {
          console.error(error);
          navigate("/login");
        });
    } else if (!token) {
      // 没有token直接跳转到登录页面
      navigate("/login");
    } else {
      // 菜单不为空时，跳转到指定页面
      if(location.pathname === '/login') {
        navigate('/dashboard')
      } else {
        navigate(location.pathname);
      }
    }
  }, [
    location.pathname,
    userInfo.menu,
    navigate,
    userInfoDispatch,
    routesDispatch,
  ]);

  return <>{element}</>;
};
