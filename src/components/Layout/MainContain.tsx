import {ReactNode} from "react";
import style from "./Layout.module.css";
import {provide} from "@/components/worker/workerObserver.ts";

export const MainContain = ({children}: { children: ReactNode }) => {

    const handleClickToUpdate = () => {
        provide.value+=1
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
