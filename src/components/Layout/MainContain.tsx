import { ReactNode } from "react";
import style from "./Layout.module.css";

export const MainContain = ({ children }: { children: ReactNode }) => {

  return (
    <div className={style.main_contain}>
      {children}
    </div>
  );
};
