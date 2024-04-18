import { ReactNode } from "react";
import style from "./Layout.module.css";
import { login } from "../../api/user";

export const MainContain = ({ children }: { children: ReactNode }) => {

  return (
    <div className={style.main_contain}>
      {children}
      <button onClick={() => login('12345@qq.com', '123456')}>登陆</button>
    </div>
  );
};
