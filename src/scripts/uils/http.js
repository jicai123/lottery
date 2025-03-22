import axios from "axios";

const http = axios.create({
  withCredentials: true,
  baseURL: '/ClientAPI',
  timeout: 20000
})

const httpConfig = {
  cancelRequest: true,       // cancelRequest 接口中定义该项则开启取消重复请求功能
  retry: 3,                  // retry 请求重试次数
  retryDelay: 1000,          // retryDelay 两次重试之间的时间间隔
  cache: true,               // cache 开启当前接口缓存
  setExpireTime: 30000,      // setExpireTime 当前接口缓存时限
}

http.defaults.headers.post['Content-Type'] = 'application/problem+json; charset=utf8';
//请求拦截
http.interceptors.request.use(
  config =>
  {
    let codeUrl = config.url.split('/')
    if(codeUrl.length > 1 && codeUrl[1] === 'CAPI'){
      config.baseURL = '/CAPI'
      let newcodeUrl = codeUrl.slice(2)
      config.url = `/${newcodeUrl.join('/')}`
    }
    if(config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put'){

    }else if(config.method.toLocaleLowerCase() === 'get' || config.method.toLocaleLowerCase() === 'delete'){
      if(config.hasOwnProperty('rconfig')){
        if(config.rconfig.hasOwnProperty('timeout')){
          config.timeout = config.rconfig.timeout
        }
      }
    }
    return config;
  },
  error => {
    return Promise.error(error);
  }
)

//响应拦截
http.interceptors.response.use(
  response => {
    if(response.status === 200){
      return Promise.resolve(response);
      // return response.data
    }else{
      return Promise.reject(response);
    }
  },
  error => {
    if(error.response.status === 401){
      sessionStorage.clear()
      window.open( '#/login?msg=您的账号会话已经超时或在其它地方被登录', '_self')
      return Promise.reject(error.response);
    }else{
      return Promise.reject(error.response);
    }
    //请求失败处理
    // if(!axios.isCancel(error)){
    //   return againRequest(error, http)
    // }
    // return Promise.reject(error);
  }
)

function againRequest(err, rAxios) {
  let config = err.config
  //config.retry 接口配置的重发次数
  if(!config || !config.rconfig.retry) return Promise.reject(err)

  //config.__retry 记录接口已重发的次数
  config.rconfig.__retryCount = config.rconfig.__retryCount || 0

  //判断是否超过设定的重发次数
  if(config.rconfig.__retryCount >= config.rconfig.retry) return Promise.reject(err)

  //重发次数递增
  config.rconfig.__retryCount ++
  //延迟处理
  let backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.rconfig.retryDelay || 1000)
  })
  //重发请求
  return backoff.then(() => {
    return rAxios(config)
  })
}

export default http;