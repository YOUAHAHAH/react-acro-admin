import NProgress from "@/utils/nprogress";
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CustomParamsSerializer
} from "axios";
import { Message } from "@arco-design/web-react";
import { AxiosCanceler } from "./utils/axiosCancel";
import { checkStatus } from "./utils/checkStatus";
import { stringify } from "qs";
import { ResultData } from "./type";
import { token } from "@/router/utils/authRouter";

const axiosCanceler = new AxiosCanceler();

const defaultConfig: AxiosRequestConfig = {
  timeout: 10000, // 请求超时时间
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        NProgress.start();
        // * 将当前请求添加到 pending 中
        axiosCanceler.addPending(config);
        // * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
        // config.headers!.noLoading || showFullScreenLoading();
        return {
          ...config,
          headers: {
            ...config.headers,
            "x-access-token": token
          }
        };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;
        NProgress.done();
        // * 在请求结束后，移除本次请求(关闭loading)
        axiosCanceler.removePending(config);
        // tryHideFullScreenLoading();
        // * 登录失效（code == 599）
        if (data.code == 500) {
          //   store.dispatch(setToken(""));
          Message.error(data.msg);
          window.location.hash = "/login";
          return Promise.reject(data);
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== 200) {
          Message.error(data.msg);
          return Promise.reject(data);
        }
        // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        NProgress.done();
        // tryHideFullScreenLoading();
        // 请求超时单独判断，请求超时没有 response
        if (error.message.indexOf("timeout") !== -1)
          Message.error("请求超时，请稍后再试");
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);
        // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) window.location.hash = "/500";
        return Promise.reject(error);
      }
    );
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export const http = new RequestHttp(defaultConfig);
