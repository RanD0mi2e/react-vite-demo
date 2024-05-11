import { MinioUploaderService } from "@/server/upload-file-server";
import { WorkerService } from "@/server/worker-service";
import { ReactNode, createContext } from "react";

// 依赖注入
const workSvc = new WorkerService(); // 线程池服务
const minioSvc = new MinioUploaderService(workSvc); // 文件上传服务

// 服务上下文
const services = {
  minioSvc,
  workSvc,
};

const ServicesContext = createContext(services);

export const RootServicesProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
