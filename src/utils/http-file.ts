enum HttpStatusText {
  completed = 'file/chunk upload completed',
  failed = 'file/chunk upload failed',
}

interface requestCallback {
  onProgress: (progress: number | string) => void;
}

/**
 * 上传文件
 * @param url 上传地址
 * @param body 上传数据
 * @param callbackOption 回调函数
 */
export function postRequest(url: string, body: FormData, callbackOption: requestCallback) {
  const xhr = new XMLHttpRequest();

  // 上传过程
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      callbackOption.onProgress(e.loaded);
    }
  }

  // 上传完成
  xhr.upload.onload = () => {
    callbackOption.onProgress(HttpStatusText.completed);
  }

  // 上传失败
  xhr.upload.onerror = () => {
    callbackOption.onProgress(HttpStatusText.failed);
  }

  xhr.open('POST', url, true);

  xhr.send(body);
}
