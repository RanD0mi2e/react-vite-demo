import {ReactNode} from "react";
import style from "./Layout.module.css";
import {bs} from "@/utils/worker/workerObserver";

export const MainContain = ({children}: { children: ReactNode }) => {

    const handleClickToUpdate = () => {
        bs.next(bs.getValue() + 1)
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
