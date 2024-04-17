import { useContext } from "react";
import style from "./Layout.module.css";
import { CounterContext } from "../../stores/counter/contexts/CounterContext";

export const Header = () => {
  const count = useContext(CounterContext);

  return (
    <div className={style.header}>
      <div>标题</div>
      {count && <div>当前值: {count.count} </div>}
    </div>
  );
};
