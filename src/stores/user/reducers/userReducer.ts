import { Reducer } from "react";
import { UserInfo } from "../contexts/UserContext";

type StateType = UserInfo;

export interface ActionType {
  type: string;
  baseInfo: UserInfo["baseInfo"];
  menu: UserInfo["menu"];
  token: string;
}

export const userReducer: Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case "update userinfo":
      return { ...state, baseInfo: action.baseInfo };
    case "update userMenuTree":
      return { ...state, menu: action.menu };
    case "update token":
      return {...state, token: action.token }
    default:
      throw new Error("userReducer: unknow action type!");
  }
};
