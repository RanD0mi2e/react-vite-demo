import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ActionType, UserActionTypes, userReducer } from "../reducers/userReducer";
import { getMenuTree } from "@/api/user";
import { MenuStruct } from "@/types/api/user";

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
export const UserDispathContext = createContext<Dispatch<ActionType> | null>(
  null
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isShow, setIsShow] = useState(false)
  const [userInfo, userInfoDispatch] = useReducer(userReducer, initUserInfo);

  async function fetchUserMenu() {
    try {
      const { code, data, message } = await getMenuTree();
      if (code === 0) {
        userInfoDispatch({
          type: UserActionTypes.UPDATE_USER_MENU,
          menu: data,
        });
        setIsShow(true)
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchUserMenu();
  }, []);

  if (!isShow) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <UserContext.Provider value={userInfo}>
        <UserDispathContext.Provider value={userInfoDispatch}>
          {children}
        </UserDispathContext.Provider>
      </UserContext.Provider>
    );
  }

};
