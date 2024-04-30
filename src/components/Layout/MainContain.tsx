import { ReactNode } from "react";
import style from "./Layout.module.css";
import { BasicObserver, BasicSubject } from "@/utils/observer";

export const MainContain = ({ children }: { children: ReactNode }) => {
  const provide = new BasicSubject<number>(0)
  const consumer = new BasicObserver<number>("no.2", (value) => {
    console.log(value);
  })
  provide.register(consumer)

  const handleClickToUpdate = () => {
    provide.value = provide.value++
  }

  return (
    <div className={style.main_contain}>
      {children}
      <div>
        <button onClick={handleClickToUpdate}>更新</button>
      </div>
    </div>
  );
};
