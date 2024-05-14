enum HttpStatusText {
  onProgress = "file/chunk upload progress",
  completed = "file/chunk upload completed",
  failed = "file/chunk upload failed",
}

export interface requestCallback {
  onProgress: (progress: number | string) => void;
}

/**
 * 上传文件
 * @param url 上传地址
 * @param body 上传数据
 * @param callbackOption 回调函数
 */
export function postRequest(
  url: string,
  body: FormData,
  callbackOption: requestCallback
) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 上传过程
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        callbackOption.onProgress(e.loaded);
        resolve(e.loaded);
      }
    };

    // 上传完成
    xhr.upload.onload = (e) => {
      callbackOption.onProgress(e.total);
      resolve(e.total);
    };

    // 上传失败
    xhr.upload.onerror = () => {
      callbackOption.onProgress(HttpStatusText.failed);
      reject(new Error(HttpStatusText.failed));
    };

    xhr.open("POST", url, true);

    xhr.send(body);
  });
}
