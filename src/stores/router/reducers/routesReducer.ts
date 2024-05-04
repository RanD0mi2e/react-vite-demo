import {Reducer} from "react";
import {RouteObject} from "react-router-dom";

export type routesState = RouteObject[]
export type routesAction = {
    type: 'replace' | 'dispatch'
    data: {
        routes: RouteObject[]
    }
}
const routesReducer: Reducer<routesState, routesAction> = (state, action) => {
    // 插入权限路由
    if (action.type === 'dispatch') {
        state = action.data.routes
    }
    // 替换整个路由
    else if (action.type === 'replace') {
        // TODO
        console.log('暂时不支持')
    }
    return state
}

export default routesReducer