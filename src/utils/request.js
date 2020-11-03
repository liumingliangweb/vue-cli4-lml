import axios from 'axios'
import store from '@/store'
import { showLoading, hideLoading } from './loading'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      showLoading()
    }
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000
      }
      // 请求头转换为表单形式
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    } else if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    // 接口统一设置token
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    hideLoading()
    const res = response.data
    // 在此对接口返回的状态码进行处理
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      if (res.status === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    hideLoading()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
