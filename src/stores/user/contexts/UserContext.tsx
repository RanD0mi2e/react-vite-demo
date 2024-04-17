import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
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
  menu: unknown[];
  token: string;
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
