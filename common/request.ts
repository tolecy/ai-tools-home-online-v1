import type { UseFetchOptions } from "nuxt/app";

type Methods = "GET" | "POST" | "DELETE" | "PUT";

// const BASE_URL = "http://localhost:8000"; // dev
const BASE_URL = "https://fastaitool.xyz"; // prod
// const BASE_URL = ""; // ???

export interface IResultData<T> {
  code: number;
  data: T;
  msg: string;
}

class HttpRequest {
  request<T = any>(
    url: string,
    method: Methods,
    data: any,
    options?: UseFetchOptions<T>,
  ) {
    return new Promise((resolve, reject) => {
      const headers: any = {
        ...options?.headers
      }
      if (process.client) {
        // 客户端请求携带token
        const token = localStorage.getItem('token')
        const Authorization = `Bearer ${token}`
        headers.Authorization = Authorization
      }
      const newOptions: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method: method,
        ...options,
        headers
      };
      if (method === "GET" || method === "DELETE") {
        newOptions.params = data;
      }
      if (method === "POST" || method === "PUT") {
        newOptions.body = data;
      }

      useFetch(url, newOptions)
        .then((res) => {
          console.log('useFetch res', url, res, res.error.value?.statusCode);
          if (res.error.value) {
            reject(res.error.value?.statusCode);
          }
          resolve(res);
        })
        .catch((error) => {
          console.log('useFetch error', url, error);
          reject(error);
        });
    });
  }

  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "GET", params, options);
  }

  post<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, "POST", data, options);
  }

  Put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, "PUT", data, options);
  }

  Delete<T = any>(url: string, params: any, options?: UseFetchOptions<T>) {
    return this.request(url, "DELETE", params, options);
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;

