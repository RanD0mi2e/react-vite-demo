import SparkMD5 from "spark-md5";
import {WorkerLabelsEnum} from "@/types/workerMessage/workerMessage.ts";
import {WorkerMessage} from "@/utils/worker/base-worker-class/workerMessage";

addEventListener('message', ({data}: { data: ArrayBuffer }) => {
    const hash = SparkMD5.ArrayBuffer.hash(data)

    postMessage(new WorkerMessage(WorkerLabelsEnum.DONE, {
        result: hash,
        chunk: data
    }), {
        transfer: [data]
    });
})