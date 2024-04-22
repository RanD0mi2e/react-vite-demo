import style from "./Layout.module.css";
import {Header} from "./Header";
import {MainContain} from "./MainContain";
import {SideBar} from "./SideBar";
import {useContext, useEffect} from "react";
import {
    MenuType,
    UserDispathContext,
} from "../../stores/user/contexts/UserContext";
import {Outlet} from "react-router-dom";
import {getMenuTree} from "@/api/user.ts";
import {UserActionTypes} from "@/stores/user/reducers/userReducer.ts";

export const Layout = () => {
    const userDispatch = useContext(UserDispathContext);
    useEffect(() => {
        // 获取菜单路由
        getMenuTree().then((resp) => {
            if (resp.code === 0) {

                const tree = resp.data as MenuType[]
                console.log(tree)
                if (userDispatch && tree.length) {
                    userDispatch({
                        type: UserActionTypes.UPDATE_USER_MENU,
                        menu: tree
                    })
                }
            }
        })
    }, [userDispatch]);

    // 树组件的处理

    return (
        <>
            <Header/>
            <div className={style.main}>
                <SideBar/>
                <MainContain>
                    <Outlet/>
                </MainContain>
            </div>
        </>
    );
};
