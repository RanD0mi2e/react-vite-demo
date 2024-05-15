import { MenuStruct, UserStruct } from "@/types/api/user"
import { service } from "../utils/customFetch"

export const login = async (email: string, password: string) => {
  return service.post<UserStruct>('/v1/login', {email, password}).then((res) => {
    return res
  })
}

export const getMenuTree = async () => {
  return service.get<MenuStruct[]>('/v1/getMenuTree').then(res => {
    return res
  })
}