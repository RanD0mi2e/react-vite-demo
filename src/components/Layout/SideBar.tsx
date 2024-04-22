import React, { useContext, useState } from "react";
import style from "./Layout.module.css";
import { MenuType, UserContext } from "../../stores/user/contexts/UserContext";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export const SideBar = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

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

  const [menuArr] = useState(
    convertMenuTreeToArr((user && user.menu) || [], [])
  );

  const location = useLocation();
  const [defaultSelectedKey] = useState(getCurrentMenu()?.key || "1");
  const [defaultOpenKeys] = useState(getOpenKeys(defaultSelectedKey, menuArr));

  // 获取当前路径对应菜单
  function getCurrentMenu() {
    const path = location.pathname;
    return menuArr.find((menu) => menu.route == path);
  }

  // 或许多级菜单中需要展开的层级
  function getOpenKeys(selectedKey: string, menus: MenuType[]) {
    const arr: string[] = [];
    let selectedObj = menus.find(menu => menu.key === selectedKey)
    while (selectedObj?.parent_id) {
      arr.push(selectedObj.parent_id)
      const subSelectedObj = menus.find(menu => menu.key === selectedObj?.parent_id)
      selectedObj = subSelectedObj
    }
    return arr
  }

  // 点击菜单
  function handleMenuOnClick(e: MenuInfo) {
    const obj = menuArr.find((arr) => {
      return arr.key == e.key;
    });
    if (obj) {
      navigate(obj.route);
    }
  }

  return (
    <div className={style.sideBar}>
      {user && user.menu.length && (
        <Menu
          style={{ height: "100%" }}
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[defaultSelectedKey]}
          defaultOpenKeys={defaultOpenKeys}
          onClick={handleMenuOnClick}
          items={user.menu}
        />
      )}
    </div>
  );
};
