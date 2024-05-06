import { WorkerLabelsEnum } from "@/types/workerMessage/workerMessage";

export class WorkerMessage<T> {
  label: WorkerLabelsEnum
  content: T

  constructor(label: WorkerLabelsEnum, content: T) {
    this.label = label
    this.content = content
  }
}