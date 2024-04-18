import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LazyLoadModule from "@/components/LazyLoadModule/LazyLoadModule";

export const Router: RouteObject[] = [
  {
    path: "/admin",
    Component: lazy(() => import("../pages/admin/Admin")),
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
        element: <Navigate to="apiManage" />,
      },
    ],
  },
  {
    path: "/commonTools",
    element: LazyLoadModule("/admin/CommonTools"),
  },
  {
    path: "*",
    Component: NotFound,
  },
];