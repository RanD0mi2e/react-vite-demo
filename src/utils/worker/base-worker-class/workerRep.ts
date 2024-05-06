import { WorkerMessage } from "./workerMessage";

export interface WorkerRep<T> {
  data: WorkerMessage<T>
}