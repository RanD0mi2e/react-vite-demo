import {Reducer} from "react";
import {UserInfo} from "../contexts/UserContext";

type StateType = UserInfo;

export interface ActionType {
    type: string;
    baseInfo?: UserInfo["baseInfo"];
    menu?: UserInfo["menu"];
    token?: string;
}

export enum UserActionTypes {
    UPDATE_USER = 'UPDATE_USER',
    UPDATE_USER_MENU = 'UPDATE_USER_MENU',
    UPDATE_TOKEN = 'UPDATE_TOKEN',
}

export const userReducer: Reducer<StateType, ActionType> = (state, action) => {
    switch (action.type) {
        case UserActionTypes.UPDATE_USER:
            return {...state, baseInfo: action.baseInfo!};
        case UserActionTypes.UPDATE_USER_MENU:
            return {...state, menu: action.menu!};
        case UserActionTypes.UPDATE_TOKEN:
            return {...state, token: action.token!}
        default:
            throw new Error("userReducer: unknow action type!");
    }
};
