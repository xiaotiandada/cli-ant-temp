import axios, { AxiosAdapter } from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

const options = {
  enabledByDefault: false,
};

const client = axios.create({
  baseURL: '',
  timeout: 1000 * 30,
  withCredentials: true,
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(
    cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, options)
  ),
})

client.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error: any) => {
    console.log(error.message)

    if (error.message.includes('status code 401')) {
      console.log('登录状态异常,请重新登录')
    }
    // 超时处理
    if (error.message.includes('timeout')) {
      console.log('请求超时')
    }
    if (error.message.includes('Network Error')) {
      console.log('Network Error')
    }
    return Promise.reject(error)
  }
)

export default client
