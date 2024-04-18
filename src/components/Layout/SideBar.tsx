import { useContext, useState } from "react";
import style from "./Layout.module.css";
import { MenuType, UserContext } from "../../stores/user/contexts/UserContext";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

interface MenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export const SideBar = () => {
  const user = useContext(UserContext);
  const defaultKey = (user && user.menu.length && user.menu[0].key) || "1";
  const navigate = useNavigate()

  // 菜单树转数组
  const convertMenuTreeToArr = (
    tree: MenuType[],
    arr: MenuType[]
  ): MenuType[] => {
    tree.forEach((item) => {
      arr.push(item);
      if (item.children && item.children.length) {
        arr = [...arr, ...convertMenuTreeToArr(item.children, arr)];
      }
    });
    return arr;
  };
  const [menuArr, setMenuArr] = useState(convertMenuTreeToArr(user && user.menu || [], []))
  console.log(convertMenuTreeToArr(user && user.menu || [], []));
  

  const handleMenuOnClick = (e:MenuInfo) => {
    const obj = menuArr.find(arr => {
      return arr.key = e.key
    })
    if (obj) {
      navigate(obj.route)
    }
  };

  return (
    <div className={style.sideBar}>
      {user && user.menu.length && (
        <Menu
          style={{ height: "100%" }}
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[defaultKey]}
          onClick={handleMenuOnClick}
          items={user.menu}
        />
      )}
    </div>
  );
};
