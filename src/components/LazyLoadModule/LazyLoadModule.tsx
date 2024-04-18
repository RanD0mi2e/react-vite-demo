import { Skeleton } from "antd";
import { Suspense, lazy } from "react";

const LazyLoadModule = (url: string) => {
  const Module = lazy(() => {
    return new Promise((resolve) => {
      import("@/pages" + url)
        .then((res) => resolve(res))
        .catch((err) => {
          resolve(import('@/pages' + '/NotFound'));
          console.log(err);
        });
    });
  });

  return <Suspense fallback={<Skeleton active />}>
    <Module />
  </Suspense>;
};

export default LazyLoadModule
