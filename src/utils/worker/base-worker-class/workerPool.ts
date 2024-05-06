import {WorkerLabelsEnum} from "@/types/workerMessage/workerMessage";
import {WorkerRep} from "./workerRep";
import {BehaviorSubject} from "@/utils/observer";

export enum StatusEnum {
    RUNNING = "running",
    WAITING = "waiting",
}

export class WorkerWrapper {
    worker: Worker;
    status: StatusEnum;

    constructor(worker: Worker) {
        this.worker = worker;
        this.status = StatusEnum.WAITING;
    }

    run<T>(param: ArrayBuffer, params: ArrayBuffer[], index: number) {
        this.status = StatusEnum.RUNNING;
        return new Promise<T>((rs, rj) => {
            this.worker.onmessage = ({
                                         data,
                                     }: WorkerRep<{ result: string; chunk: ArrayBuffer }>) => {
                const {label, content} = data;
                if (label === WorkerLabelsEnum.DONE && content) {
                    params[index] = content.chunk;
                    this.status = StatusEnum.WAITING;
                    rs(content.result as T);
                }
            };
            this.worker.onerror = (e) => {
                this.status = StatusEnum.WAITING;
                rj(e);
            };

            this.worker.postMessage(param, [param]);
        });
    }
}

export abstract class WorkerPool {
    // 线程池
    pool: WorkerWrapper[] = [];
    // 最大并发数
    maxWorkerCount: number;
    // 当前运行数量(订阅者)
    curRunningCount = new BehaviorSubject(0)
    results: unknown[] = [];

    protected constructor(maxWorkers = navigator.hardwareConcurrency || 4) {
        this.maxWorkerCount = maxWorkers;
    }

    exec<T>(params: ArrayBuffer[]) {
        this.results.length = 0
        const workerParams = params.map((param, index) => ({data: param, index}))

        return new Promise<T[]>((rs) => {
            // 订阅运行数量的变化
            this.curRunningCount.subscribe("running_worker_number", this.curRunningCount.getValue(), (count) => {
                if (count < this.maxWorkerCount && workerParams.length !== 0) {
                    // 线程池空闲线程数
                    let curTaskCount = this.maxWorkerCount - count
                    // 分片数量小于空闲线程数，根据分片数量分配空闲线程
                    if (curTaskCount > workerParams.length) {
                        curTaskCount = workerParams.length
                    }
                    // 空闲线程数组
                    const canUseWorker: WorkerWrapper[] = []
                    for (const worker of this.pool) {
                        if (worker.status === StatusEnum.WAITING) {
                            canUseWorker.push(worker);
                            if (canUseWorker.length === curTaskCount) {
                                break
                            }
                        }
                    }

                    // 需要线程运算的二进制流数据数组
                    const paramsToRun = workerParams.splice(0, curTaskCount)

                    // 更新当前运行中的worker数量
                    this.curRunningCount.next(this.curRunningCount.getValue() + curTaskCount);

                    canUseWorker.forEach((workerApp, index) => {
                        const param = paramsToRun[index]
                        workerApp.run(param.data, params, param.index).then((res) => {
                            this.results[param.index] = res as string
                        }).catch((e) => {
                            this.results[param.index] = e
                        }).finally(() => {
                            this.curRunningCount.next(this.curRunningCount.getValue() - 1);
                        })
                    })

                }

                // 线程池内所有任务执行完成
                if (workerParams.length === 0 && this.curRunningCount.getValue() === 0) {
                    rs(this.results as T[])
                }
            })
        })
    }
}
