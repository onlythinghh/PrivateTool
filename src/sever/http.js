import getjsonp from "fetch-jsonp"
import axios from "axios"
import { resolve } from "path";
import { rejects } from "assert";


const AjaxData = (params) => {
    let array = [];
    for (let i in params) array.push(i + '=' + params[i]);
    return array.join('&');
}
const jsonp = (url, data, obj) => {
    var datas = AjaxData(data)
    getjsonp(url + encodeURI(datas), {
        jsonpCallback: data.jsonCallback || 'jsonpCallback',
        timeout: 30000,
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        obj && obj.success && obj.success(data);
    })
    .catch(function (ex) {
        obj && obj.error && obj.error();
    });
};


// axios 封装
axios.defaults.timeout = 5000; // 超时时间

// 一下两项若不需要重新请求可不设置
axios.defaults.retry = 3; // 请求次数
axios .defaults.retryDelay = 1000 // 请求间隔

// 请求拦截器 发送请求之前做的一些事情比如处理数据
axios.interceptors.request.use(config => {
    console.log('请求拦截器', config)
    // 请求前逻辑处理
    return config;
}, err => {
    // 请求错误处理
})

// 响应拦截器 发送之后做的一些事情
axios.interceptors.response.use(response => {
    // 响应成功处理逻辑
    console.log('响应拦截器',response)
    return response;
}, err => {
    // 响应失败
    console.log('响应失败', err.config)
    let config = err.config;
    // 如果config不存在或者没有设置重试次数则直接返回错误信息
    if(!config || !config.retry) return Promise.reject(err);
    // 设置重试次数
    config.__retryCount = config.__retryCount || 0; 
    // 检查是否超出请求次数
    if(config.__retryCount >= config.retry) {
        // 如果超过请求次数就返回错误信息或者做其他处理（比如弹出请求超时弹框）
        // alert('请求超时')
        return Promise.reject(err)
    }
    // 累加重试次数
    config.__retryCount += 1

    // 创建延时器等待发送重试请求
    const backoff = new Promise((resolve) => {
        setTimeout(function(){
            resolve()
        }, config.retryDelay || 1)
    })
    // 返回调用AXIOS来重试请求
    return backoff.then(function(){
        return axios(config)
    })
})
class axiosHttp {
    request(params) {
        return new Promise((resolve, reject) => {
            axios({
                method: params.Type || 'get',
                url: params.url || '',
                data: params.data || '',
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}


export {
    jsonp,
    axiosHttp
}