import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
} from "react";
import { ActionType, userReducer } from "../reducers/userReducer";

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

export type MenuType = {
  key: string;
  lebel: string;
  permission_type: string;
  parent_id: string;
  level: number;
  icon: string;
  route: string;
  route_file: string;
  path: string;
  method: string;
  children: MenuType[];
};

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
export const UserDispathContext = createContext<Dispatch<ActionType> | null>(
  null
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, userInfoDispatch] = useReducer(userReducer, initUserInfo);
  return (
    <UserContext.Provider value={userInfo}>
      <UserDispathContext.Provider value={userInfoDispatch}>
        {children}
      </UserDispathContext.Provider>
    </UserContext.Provider>
  );
};
