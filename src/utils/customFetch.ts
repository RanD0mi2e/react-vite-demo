import { getToken } from "./token";

type Interceptor<T> = (config: T) => T;

type FetchConfig = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: unknown;
};

type RequestInterceptor = Interceptor<FetchConfig>;
type ResponseInterceptor = Interceptor<Response>;

class Fetch {
  protected BASE_URL = ''  // 基础路径
  protected TIME_OUT = 10000  // 请求最长等待时间
  private requestInterceptor: RequestInterceptor | null = null;
  private responseInterceptor: ResponseInterceptor | null = null;

  // 添加请求拦截器
  setRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptor = interceptor;
  }

  // 添加响应拦截器
  setResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptor = interceptor;
  }

  // 执行请求拦截器
  private execRequestInterceptors(config: FetchConfig): FetchConfig {
    if (this.requestInterceptor) {
      return this.requestInterceptor(config);
    }
    return config;
  }

  // 执行响应拦截器
  private execResponseInterceptors(response: Response): Response {
    if(this.responseInterceptor) {
      return this.responseInterceptor(response)
    }
    return response
  }

  // 发送请求
  private sendRequest(config: FetchConfig): Promise<Response> {
    // 请求拦截
    const newConfig = this.execRequestInterceptors(config)
    // 对body进行类型断言
    const body = newConfig.body as BodyInit | null | undefined
    return fetch(newConfig.url, {...newConfig, body}).then(resp => {
      // 响应拦截
      return this.execResponseInterceptors(resp)
    }).catch((err) => {
      console.error('setRequestErr:', err);
      throw err
    })
  }

  // Get请求
  get(url: string, params: Record<string, string>) {
    let queryStr = ''
    if(params) {
      queryStr = new URLSearchParams(params).toString()
      if(queryStr) {
        url += '?' + queryStr
      }
    }
    const config: FetchConfig = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        'Authorization': getToken()
      },
      url: queryStr
    }
    return this.sendRequest(config)
  }

  // Post请求
  post(url: string, body: Record<string, unknown>) {
    const config: FetchConfig = {
      url,
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        'Authorization': getToken()
      },
      body: JSON.stringify(body)
    }
    return this.sendRequest(config)
  }
}

export const service = new Fetch()
