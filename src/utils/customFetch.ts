import { getToken } from "./token";

type Interceptor<T> = (config: T) => T;

type FetchConfig = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: unknown;
};

type ResponseJson<T> = {
  code: number
  message: string
  data: T
}

type RequestInterceptor = Interceptor<FetchConfig>;
type ResponseInterceptor = Interceptor<Response>;

class Fetch {
  protected BASE_URL = ''  // 基础路径
  protected TIME_OUT = 5000  // 请求最长等待时间
  private requestInterceptor: RequestInterceptor | null = null;
  private responseInterceptor: ResponseInterceptor | null = null;

  // 设置baseurl
  setBaseUrl(url: string) {
    this.BASE_URL = url
  }
  
  // 设置timeout
  setTimeout(delay: number) {
    this.TIME_OUT = delay
  }

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
  private async sendRequest<T>(config: FetchConfig): Promise<ResponseJson<T>> {
    // 请求时间控制
    const controller = new AbortController()
    const signal = controller.signal
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, this.TIME_OUT);
    // 请求拦截
    const newConfig = this.execRequestInterceptors(config)
    // 对body进行类型断言
    const body = newConfig.body as BodyInit | null | undefined
    return fetch(newConfig.url, {...newConfig, body, signal}).then(resp => {
      clearTimeout(timeoutId)
      // 响应拦截
      return this.execResponseInterceptors(resp).json()
    }).catch((err) => {
      console.error('setRequestErr:', err);
      if (err.name === 'AbortError') {
        throw new Error('Request timeout')
      } else {
        throw err
      }
    })
  }

  // Get请求
  get<T>(url: string, params?: Record<string, string>) {
    let queryStr = ''
    if(params) {
      queryStr = new URLSearchParams(params).toString()
      if(queryStr) {
        url += '?' + queryStr
      }
    }
    const config: FetchConfig = {
      method: 'GET',
      url: this.BASE_URL + url
    }
    return this.sendRequest<T>(config)
  }

  // Post请求
  post<T>(url: string, body: Record<string, unknown>) {
    const config: FetchConfig = {
      url: this.BASE_URL + url,
      method: 'POST',
      body: JSON.stringify(body)
    }
    return this.sendRequest<T>(config)
  }
}

// 初始化Fetch实例
export const service = new Fetch()
// 基础路径
service.setBaseUrl(import.meta.env.VITE_BASE_URL)
// 等待时间
service.setTimeout(10000)
// 注入请求头
const defaultConfig = {
  headers: {
    'Content-type': 'application/json;charset=UTF-8',
    'Authorization': getToken()
  },
}
service.setRequestInterceptor((config) => {
  return {...config, ...defaultConfig}
})
