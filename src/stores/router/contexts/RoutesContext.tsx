import {createContext, Dispatch, ReactNode, useReducer} from "react";
import {RouteObject} from "react-router-dom";
import {Routes} from "@/router/permission.tsx";
import routesReducer, {routesAction} from "@/stores/router/reducers/routesReducer.ts";

export const RoutesContext = createContext<RouteObject[]>([]);
export const RouterDispatchContext = createContext<Dispatch<routesAction>>(() => {
})

export const RoutesProvider = ({children}: { children: ReactNode }) => {
    const [routes, dispatch] = useReducer(routesReducer, Routes);

    return (
        <RoutesContext.Provider value={routes}>
            <RouterDispatchContext.Provider value={dispatch}>
                {children}
            </RouterDispatchContext.Provider>
        </RoutesContext.Provider>
    )
}