import { Dispatch, useContext } from "react";
import { RouterDispatchContext, RoutesContext } from "./contexts/RoutesContext";
import { RouteObject } from "react-router-dom";
import { routesAction } from "./reducers/routesReducer";

export const useRoutesInfo = (): [RouteObject[], Dispatch<routesAction>]  => {
  const routes = useContext(RoutesContext);
  const routesDispatch = useContext(RouterDispatchContext);
  return [routes, routesDispatch]
}
