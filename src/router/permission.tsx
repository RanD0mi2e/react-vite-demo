import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/NotFound";

export const Router = createBrowserRouter([
  {
    path: "/admin",
    Component: lazy(() => import("../pages/admin/Admin")),
    children: [
      {
        path: "apiManage",
        Component: lazy(() => import("../pages/admin/ApiManage")),
      },
      {
        path: "menuManage",
        Component: lazy(() => import("../pages/admin/MenuManege")),
      },
      {
        path: "commonTools",
        Component: lazy(() => import("../pages/admin/CommonTools")),
      },
      {
        path: "",
        element: <Navigate to="apiManage" />,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);