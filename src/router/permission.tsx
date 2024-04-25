import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LazyLoadModule from "@/components/LazyLoadModule/LazyLoadModule";
import { Layout } from "@/components/Layout/Layout";

// 默认路由
export const Router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/dashboard',
        element: LazyLoadModule('/dashboard/Dashboard')
      },
      {
        path: "*",
        Component: NotFound,
      },
    ]
  },
]);

// 动态添加路由