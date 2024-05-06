// md5分片线程
import {WorkerPool, WorkerWrapper} from "@/utils/worker/base-worker-class/workerPool";

export class WorkerPoolForMd5 extends WorkerPool {
    constructor(maxWorkers: number) {
        super(maxWorkers);
        console.log(import.meta.url)
        console.log(new URL('./md5-single.worker', import.meta.url))
        this.pool = Array.from({length: this.maxWorkerCount}).map(() => new WorkerWrapper(new Worker(new URL('./md5-single.worker', import.meta.url), {
            type: 'module'
        })))
    }
}