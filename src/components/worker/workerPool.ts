import { WorkerLabelsEnum } from "@/types/workerMessage/workerMessage";
import { WorkerRep } from "./workerRep";
import { BasicObserver, BasicObserverCallback, BasicSubject } from "@/utils/observer";
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
        const { label, content } = data;
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
  curRunningCount = new BasicSubject<number>(0);
  result: unknown[] = [];

  constructor(maxWorkers = navigator.hardwareConcurrency || 4) {
    this.maxWorkerCount = maxWorkers;
  }

  exec<T>(params: ArrayBuffer[]) {
    this.result.length = 0
    const workerParams = params.map((param, index) => ({data: param, index}))
    
    return new Promise<T[]>((rs) => {
      // 订阅运行数量的变化
      const observer = new BasicObserver<number>("no.1", (count: number) => {})
      this.curRunningCount.register(observer)
    })
  }
}
