import {BasicObserver, BasicSubject} from "@/utils/observer.ts";

// 当前运行线程数
export const provide = new BasicSubject<number>(0)
export const consumer = new BasicObserver<number>("no.2", 0, (value) => {
    console.log(value)
})
provide.register(consumer)