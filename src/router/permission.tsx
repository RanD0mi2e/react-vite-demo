import { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LazyLoadModule from "@/components/LazyLoadModule/LazyLoadModule";
import { Layout } from "@/components/Layout/Layout";

// 默认路由
export const Routes: RouteObject[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/demo",
        element: LazyLoadModule("/demo/Demo"),
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  // 登录页
  {
    path: "/login",
    element: LazyLoadModule("/login/Login"),
  },
];
