import {useNavigate, useRoutes} from "react-router-dom";
import {Routes} from "./router";
import {useContext, useEffect} from "react";
import {UserContext, UserDispathContext} from "./stores/user/contexts/UserContext";
import './App.css'
import {getMenuTree} from "@/api/user.ts";
import {UserActionTypes} from "@/stores/user/reducers/userReducer.ts";
import {addRoutes, filterRoutes} from "@/router/routerHelpers.ts";
import _ from 'lodash'
import {RouterDispatchContext, RoutesContext} from "@/stores/router/contexts/RoutesContext.tsx";

const App = () => {
    const user = useContext(UserContext);
    const userInfoDispatch = useContext(UserDispathContext)
    const routes = useContext(RoutesContext)
    const routesDispatch = useContext(RouterDispatchContext)
    const element = useRoutes(routes)
    const navigate = useNavigate()

    // 请求菜单
    async function fetchUserMenu() {
        try {
            const {code, data, message} = await getMenuTree();
            if (code === 0) {
                userInfoDispatch({
                    type: UserActionTypes.UPDATE_USER_MENU,
                    menu: data,


                });
            } else {
                throw new Error(message);
            }
        } catch (error) {
            console.error(error);
            navigate("/login")
        }
    }

    useEffect(() => {
        fetchUserMenu();
    }, []);

    useEffect(() => {
        if (user && user.menu && user.menu.length) {
            // 这个地方深拷贝一定要小心，如果拷贝把Component函数丢失了会导致渲染失败
            const result = addRoutes(_.cloneDeep(Routes), filterRoutes(user.menu))
            routesDispatch({
                type: 'dispatch',
                data: {
                    routes: result
                }
            })
        }
    }, [user?.menu]);


    return (
        <div className={'height_all'}>
            {element}
        </div>
    )
};

export default App
