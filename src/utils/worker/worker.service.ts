import {WorkerPoolForMd5} from "@/utils/worker/workerPoolForMd5";
import SparkMD5 from "spark-md5";

export class WorkerService {
    // 线程池最大上限
    readonly MAX_WORKER_PROCESS = 8;
    md5SingleWorkerPool: WorkerPoolForMd5 | undefined;

    // 计算所有分片的md5
    async getMD5ForFiles(chunks: ArrayBuffer[]) {
        if (this.md5SingleWorkerPool === undefined) {
            this.md5SingleWorkerPool = new WorkerPoolForMd5(this.MAX_WORKER_PROCESS);
        }
        const strArr = await this.md5SingleWorkerPool.exec<string>(chunks)
        const strs = strArr.reduce((prevStr, currStr) => {
            return prevStr += currStr
        }, "")
        return SparkMD5.hash(strs)
    }
}