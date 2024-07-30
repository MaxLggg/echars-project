import axios from 'axios';
import { ElMessage } from 'element-plus';
import { baseUrl } from '../api';
import { TOKEN } from "../constants/sessionStorageKeys";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { LOGIN_URL } from '../constants';

NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  easing: "swing",
  speed: 1000
})

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 3 * 60 * 1000
})
const ERROR_STATUSES = [401]
// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    const token = window.sessionStorage.getItem(TOKEN);
    if (token) {
      config.headers!['Token'] = token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
);

//防止多次请求进度条重复加载
let loadingNum = 0;
function startLoading() {
  if (loadingNum == 0) {
    NProgress.start()
  }
  loadingNum++;
}
function endLoading() {
  loadingNum--
  if (loadingNum <= 0) {
    NProgress.done()
  }
}

axiosInstance.interceptors.request.use(
  config => {
    startLoading();
    return config
  },
  error => Promise.reject(error)
)

// 返回拦截器
axiosInstance.interceptors.response.use(
  res => {
    endLoading();
    if (res.status === 200 && res.headers["content-type"] && res.headers["content-type"].includes("stream")) {
      return res;
    }
    const code = res.data.code;
    if (res.data.flag === '0') {
      // location.href = LOGIN_URL;
      ElMessage.error(res.data.message || '登录过期，请重新登录');
      return Promise.reject(res.data.message || '登录过期，请重新登录');
    }
    switch (code) {
      case 200:
        return res.data;
      case '401':
        // console.log("[ 401 :]", 401);
        ElMessage.error(res.data.message || '登录过期，请重新登录');
        // window.sessionStorage.removeItem(TOKEN);
        window.sessionStorage.clear();
        setTimeout(() => {
          location.href = LOGIN_URL;
        }, 1000);
        // return Promise.reject(new Error(res.data.message || '登录过期，请重新登录'));
        break;
      case '500':
        ElMessage.error(res.data.message || '服务器内部错误');
        // window.sessionStorage.removeItem(TOKEN);
        setTimeout(() => {
          // location.href = LOGIN_URL;
        }, 1000);
        // return Promise.reject(new Error(res.data.message || '登录过期，请重新登录'));
        break;
      default:
        return Promise.reject(res.data.message || '登录过期，请重新登录');
    }
  },
  error => {
    // console.log("[ error :]", error);
    ElMessage.error(error.message);
    endLoading();
    if (error.request.status === 401) {
      // if (ERROR_STATUSES.includes(error.request.status)) {
      setTimeout(() => {
        window.sessionStorage.clear();
        location.href = LOGIN_URL;
      }, 1000);

    } else {
      return Promise.reject(typeof error === 'string' ? error : error.message || '网络错误')
      // if (typeof error === 'string') {
      //     return Promise.reject(error)
      // }else{
      //     return 
      // }
    }
  }
)

export default axiosInstance;
