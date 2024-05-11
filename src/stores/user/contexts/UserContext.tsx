import {
    Dispatch,
    ReactNode,
    createContext,
    useReducer,
} from "react";
import {ActionType, userReducer} from "../reducers/userReducer";
import {MenuStruct} from "@/types/api/user";

export type UserInfo = {
    baseInfo: {
        userId: string;
        nickname: string;
        email: string;
        roles: unknown[];
    };
    menu: MenuType[];
    token: string;
};

export type MenuType = Omit<MenuStruct, 'label' | 'deleted_at'>

const initUserInfo: UserInfo = {
    baseInfo: {
        userId: "",
        nickname: "",
        email: "",
        roles: [],
    },
    menu: [],
    token: localStorage.getItem("token") || "",
};

export const UserContext = createContext<UserInfo | null>(null);
export const UserDispathContext = createContext<Dispatch<ActionType>>(
    () => {
    }
);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [userInfo, userInfoDispatch] = useReducer(userReducer, initUserInfo);

    return (
        <UserContext.Provider value={userInfo}>
            <UserDispathContext.Provider value={userInfoDispatch}>
                {children}
            </UserDispathContext.Provider>
        </UserContext.Provider>
    );
};
