import { service } from "../utils/customFetch"

export const getUserMenu = (email: string, password: string) => {
  return service.post('/v1/login', {email, password}).then((res) => {
    return res
  })
}