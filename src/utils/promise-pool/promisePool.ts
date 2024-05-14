import { BehaviorSubject } from "../observer";

type AsyncFunction = () => Promise<unknown>;

export class PromisePool {
  private readonly queue: { fn: AsyncFunction; index: number }[] = [];
  private readonly maxConcurrentTasks: number;
  private results: unknown[] = [];
  curRunningCount = new BehaviorSubject(0);

  constructor(
    functions: AsyncFunction[],
    maxConcurrentTask: number = navigator.hardwareConcurrency || 8
  ) {
    this.queue = functions.map((fn, index) => ({ fn, index }));
    this.maxConcurrentTasks = maxConcurrentTask;
  }

  exec<T>(): Promise<T[]> {
    return new Promise((rs) => {
      this.curRunningCount.subscribe(
        "running_promise",
        this.curRunningCount.getValue(),
        (count) => {
          // 有空闲线程 || 队列任务不为空
          if (count < this.maxConcurrentTasks && this.queue.length !== 0) {
            let curTaskCount = this.maxConcurrentTasks - count;
            if (curTaskCount > this.queue.length) {
              curTaskCount = this.queue.length;
            }
            const tasks = this.queue.splice(0, curTaskCount);
            this.curRunningCount.next(
              this.curRunningCount.getValue() + curTaskCount
            )
            tasks.forEach((taskWrap) => {
              const {fn, index} = taskWrap
              fn().then((resp) => {
                this.results[index] = resp
              }).catch((err) => {
                this.results[index] = err
              }).finally(() => {
                this.curRunningCount.next(this.curRunningCount.getValue() - 1)
              })
            })
          }
          // 所有异步任务执行完成
          if (this.curRunningCount.getValue() === 0 && this.queue.length === 0) {
            rs(this.results as T[])
          }
        }
      );
    });
  }
}
