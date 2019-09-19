const globalError = (response)=>{
  wx.showModal({
    title: String(response.status_code),
    content: response.message,
    confirmText: "确定",
    showCancel:false,
  })
}

const interceptorsRequest = (method, url, data, header={})=> {
  const app = getApp();
  let params = { method, url, data, header };
  // let storageUserInfo = wx.getStorageSync('userInfo')
  let appUserInfo = app.globalDatas.userInfo.id;
  if(appUserInfo){
    header['Authorization'] = `Bearer ${appUserInfo.token}`
  }
  return params
}

const request = (method, url, data, header) => {
  let params = interceptorsRequest(method, url, data, header)
  return new Promise((resolve, reject)=>{
    wx.request({
      method,
      url: params.url,
      header: params.header,
      data: params.data,
      success: (res) => {
        if(res.statusCode === 200){
          switch (true) {
            case res.data.code === 200:
              resolve(res.data.data);
              break;
            case res.data.code === 0:
              reject(res.data);
              break;
            default:
              resolve(res.data);
              break;
          }
        }else{
          globalError(res.data);
          reject(res.data.message);
        }
      },
      fail: (err) => {
        globalError({
          status_code: 500,
          message: '服务器发生错误',
        })
        reject(err)
      }
    })
  })
}

/* [请求库]
** @params url         { string }   @default => '' [接口地址，统一在 api 文件中]
** @params data/params { object }   @default => {} [发送数据]
** @params header      { object }   @default => {} [请求 Header 配置]
*/

export default {
  post: function (url='', data={}, header={}) {
    return request('POST', url, data, header)
  },
  put: function (url='', data={}, header={}) {
    return request('PUT', url, data, header)
  },
  get: function (url, data={}, header={}) {
    return request('GET', url, data, header)
  },
  delete: function (url='', data={}, header={}) {
    return request('DELETE', url, header)
  }
}