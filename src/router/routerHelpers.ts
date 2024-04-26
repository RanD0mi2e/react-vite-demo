import LazyLoadModule from "@/components/LazyLoadModule/LazyLoadModule"
import { MenuType } from "@/stores/user/contexts/UserContext"
import { RouteObject } from "react-router-dom"

type MenuObj = RouteObject

// 动态添加路由
export const addRoutes = (menus: MenuType[]) => {
  let temp: MenuObj[] = []
  menus.forEach(menu => {
    const path = menu.route
    const element = LazyLoadModule(menu.route_file)
    temp.push({
      path,
      element
    })
    if (menu.children) {
      const result = addRoutes(menu.children)
      temp = temp.concat(result)
    }
  })
  return temp
}