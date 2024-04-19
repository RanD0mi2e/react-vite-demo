import { Navigate, createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LazyLoadModule from "@/components/LazyLoadModule/LazyLoadModule";
import { Layout } from "@/components/Layout/Layout";

export const Router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: "admin",
        element: LazyLoadModule('/admin/Admin'),
        children: [
          {
            path: "apiManage",
            element: LazyLoadModule('/admin/ApiManage'),
          },
          {
            path: "menuManage",
            element: LazyLoadModule('/admin/MenuManege'),
          },
          {
            path: "",
            element: <Navigate to="MenuManege" />,
          },
        ],
      },
      {
        path: '/voice',
        element: LazyLoadModule('/voice/Voice')
      },
      {
        path: '/dashboard',
        element: LazyLoadModule('/dashboard/Dashboard')
      },
      {
        path: "/commonTools",
        element: LazyLoadModule("/admin/CommonTools"),
      },
      {
        path: "*",
        Component: NotFound,
      },
    ]
  },
]);