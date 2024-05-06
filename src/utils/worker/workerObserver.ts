import {BehaviorSubject} from "@/utils/observer.ts";

// 当前运行线程数
export const bs = new BehaviorSubject(0)
bs.subscribe("no.2", 0, (value) => {
    console.log(value)
})