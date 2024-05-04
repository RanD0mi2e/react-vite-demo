import LazyLoadModule from "@/components/LazyLoadModule/LazyLoadModule"
import { MenuType } from "@/stores/user/contexts/UserContext"
import { RouteObject } from "react-router-dom"

// 动态添加路由
export const addRoutes = (defaultRoutes: RouteObject[], routes: RouteObject[]) => {
  const rootRoute = defaultRoutes.find(route => route.path === '/')
  if (rootRoute && rootRoute.children) {
    rootRoute.children = [...rootRoute.children, ...routes]
  }
  return defaultRoutes
}

export const filterRoutes = (menus: MenuType[]) => {
  const temp: RouteObject[] = []
  menus.forEach(menu => {
    const pathArr = menu.route.split('/')
    const path = pathArr[menu.level]
    const element = LazyLoadModule(menu.route_file)
    temp.push({
      path,
      element
    })
    if (menu.children) {
      // const result = addRoutes(menu.children)
      // temp = temp.concat(result)
      temp[temp.length - 1].children = filterRoutes(menu.children)
    }
  })
  return temp
}