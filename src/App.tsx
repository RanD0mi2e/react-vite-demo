import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routes } from "./router/permission";
import { useContext } from "react";
import { UserContext } from "./stores/user/contexts/UserContext";
import { addRoutes } from "./router/routerHelpers";

export const App = () => {
  const routes = Routes;
  const user = useContext(UserContext)
  if(user?.menu) {
    const matchObj = routes.find(route => route.path === '/')
    if(matchObj && matchObj.children) {
      matchObj.children = matchObj.children.concat(addRoutes(user.menu))
    }
  }
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />;
};
