import { Skeleton } from "antd";
import { Suspense, lazy } from "react";

// 利用vite静态导入module
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const compModules = import.meta.glob("@/pages/*/*.tsx") as any;
const LazyLoadModule = (url: string) => {
  try {
    if (!compModules[`/src/pages${url}.tsx`]) {
      throw new Error(`前端缺少后端菜单对应的文件路径: ${url}`);
    }
  } catch (error) {
    console.error(error);
  }
  const Module = lazy(compModules[`/src/pages${url}.tsx`]);

  // 动态导入module，但是vite是无法分析动态导入的模块，在打包生产环境下会出错
  /* const Module = lazy(() => {
    return new Promise((resolve) => {
      import("../../pages" + url)
        .then((res) => resolve(res))
        .catch((err) => {
          resolve(import('../../pages' + '/NotFound'));
          console.log(err);
        });
    });
  }); */
  return (
    <Suspense fallback={<Skeleton active />}>
      <Module />
    </Suspense>
  );
};

export default LazyLoadModule;
