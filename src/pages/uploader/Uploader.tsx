import { PromisePool } from "@/utils/promise-pool/promisePool";
import { getArrayBufFromFile } from "@/utils/uploaderHelpers";
import { WorkerService } from "@/server/worker-service";
import { ChangeEvent, useRef } from "react";

const Uploader = () => {
  const workerSrv = useRef(new WorkerService());

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const aFile = e.target.files[0];
      console.log(aFile);
      // 大文件切片
      console.time("slice file");
      const arrbufs = await getArrayBufFromFile(aFile);
      console.timeEnd("slice file");
      // 获取大文件md5
      console.time("calculate hash");
      const fileHash = await workerSrv.current.getMD5ForFiles(arrbufs);
      console.timeEnd("calculate hash");
    }
  };

  function testPromisePool() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const asyncFns = arr.map((num) => async () => {
      console.log("跑起来了" + num);
      await new Promise<number>((rs) => {
        setTimeout(() => {
          rs(num * 2);
        }, 200);
      });

      return new Promise((rs) => {
        setTimeout(() => {
          rs("结果：" + num * 10);
        }, 200);
      });
    });

    const pool = new PromisePool(asyncFns, 4)
    pool.exec<string>().then(res => {
      console.log(res);
    })
  }

  return (
    <>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={testPromisePool}>测试promise线程池</button>
    </>
  );
};

export default Uploader;
