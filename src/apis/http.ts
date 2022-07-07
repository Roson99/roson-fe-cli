import Axios, { AxiosRequestConfig } from 'axios';
// import { store } from '../store';
// import ls from 'src/utils/localStore';
const ls = localStorage;
// 统一配置
let baseURL = '';
const service = Axios.create({
  baseURL,
  responseType: 'json',
  timeout: 60000,
});
export const serviceStream = Axios.create({
  baseURL,
  responseType: 'blob',
  timeout: 60000,
});
serviceStream.interceptors.request.use((res: any) => {
  res.headers.loginUserId = '';
  res.headers.loginCompanyId = '';

  return res;
});
// count 不为0有遮罩
let count = 0;
const showGlobalLoading = () => {
  if (count === 0) {
    // store.dispatch({ type: 'app/setSpinning', payload: true });
  }
  count++;
};
const hideGlobalLoading = () => {
  if (count <= 0) return;
  count--;
  if (count === 0) {
    // store.dispatch({ type: 'app/setSpinning', payload: false });
  }
};
service.interceptors.request.use((res: any) => {
  if (!res.hiddenMask) {
    showGlobalLoading();
  }
  res.headers['quick-token'] = sessionStorage.getItem('quick-token') || '';
  res.headers['Accept-Language'] = ls.getItem('qs_lang') || 'zh-CN';
  res.headers['Access-Control-Allow-Origin'] = '*';
  return res;
});

// 拦截响应
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    if (!response.config.hiddenMask) {
      hideGlobalLoading();
    }
    if (res.success || isBlob(response)) {
      /* 增加禁用属性dialogDisabled */
      if (res.message && !response.config.dialogDisabled) {
        console.info(res.message, 5);
      }
      return response;
    } else {
      if (res.message) {
        console.error(res.message, 5);
      }
      return Promise.reject(res);
    }
  },
  (err) => {
    hideGlobalLoading();
    console.error(err.message, 5);
    return Promise.reject(err);
  },
);

// 异常token过期 重定向到 login
/* 请求返回值 */
interface resData<T> {
  success?: boolean;
  data: T;
  code: number;
  message: string;
}
export default function request<Q = any, Res = any>(
  req: AxiosRequestConfig & {
    data?: Q;
    hiddenMask?: Boolean;
    dialogDisabled?: boolean;
  },
) {
  return service(req).then(
    (res) => {
      return res.data as resData<Res>;
    },
    (res) => {
      return Promise.reject(res.data as resData<Res>);
    },
  );
}

//判断是不是blob
const isBlob = (response: any) => {
  if (response.config.responseType === 'blob' && response.status === 200) {
    return true;
  } else {
    return false;
  }
};
