import http from "@/scripts/uils/http";
import Qs from 'qs'

/*
* 返回data信息
* */
export function get(url, params ,rconfig) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: params,
      rconfig: rconfig
    }).then(res => {
      resolve(dataCode(res.data))
    }).catch(error => {
      reject(error)
    })
  })
}

/*
* 返回所有信息
* */
export function getAll(url, params) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    http.post(url, params, {
      headers: {
        'Content-Type': 'application/problem+json; charset=utf8'
      }
    })
      .then(res => {
        resolve(res.data)
      }).catch(error => {
      reject(error)
    })
  })
}

export function postForm(url, params) {
  return new Promise((resolve, reject) => {
    http.post(url, Qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf8'
      }
    })
      .then(res => {
        resolve(res.data)
      }).catch(error => {
      reject(error)
    })
  })
}


export function put(url, params) {
  return new Promise((resolve, reject) => {
    http.put(url, params, {
      headers: {
        'Content-Type': 'application/problem+json; charset=utf8'
      }
    })
      .then(res => {
        resolve(res.data)
      }).catch(error => {
      reject(error)
    })
  })
}

export function putForm(url, params) {
  return new Promise((resolve, reject) => {
    http.put(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf8'
      }
    })
      .then(res => {
        resolve(res.data)
      }).catch(error => {
      reject(error)
    })
  })
}

export function del(url, params) {
  return new Promise((resolve, reject) => {
    http.delete(url, params)
      .then(res => {
        resolve(res.data)
      }).catch(error => {
      reject(error)
    })
  })
}

function dataCode(res) {
  if (res.hasOwnProperty('Code') && res.Code === 0) {
    return res.Data
  }
}

export const urlQueryFn = (obj) => {
  let url ='';
  let queryArr = [];
  for (let k in obj) {
    if (obj[k] != undefined && obj[k] != null && obj[k] != '') {
      queryArr.push(`${k}=${obj[k]}`)
    }
  }
  if(queryArr.length > 0){
    url = `?${queryArr.join('&')}`
  }else{
    url = ''
  }
  return url
}