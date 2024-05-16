import { Dispatch, useContext } from "react"
import { UserContext, UserDispathContext, UserInfo } from "./contexts/UserContext"
import { ActionType } from "./reducers/userReducer"

export const useUserInfo = (): [UserInfo, Dispatch<ActionType>] => {
  const context = useContext(UserContext) as UserInfo
  const contextDispatch = useContext(UserDispathContext)
  return [context, contextDispatch]
}