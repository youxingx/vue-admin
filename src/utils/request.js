import axios from 'axios'

//创建axios，赋给变量service
//手把手撸码前端api,地址 :  http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === 'production' ? '':'/simulateagent';
const service = axios.create({
        // baseURL: 'https://some-domain.com/api/',
        baseURL: BASEURL,
        // baseURL: 'http://www.baidu.com',
        timeout: 1000,
    }
)

// console.log(process.env.VUE_APP_ABC)

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;
/**
 *使用export default时，不能同时使用多个default
 * 文件import 不需要 {},直接引入
 */