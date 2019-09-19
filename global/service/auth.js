import wxRequest from './../request/wxrequest.js';
import API from './../request/api.js';

module.exports = {
  getUserInfo: function() {
    const app = getApp();

    return new Promise((resolve,reject) => {
      // 查看缓存
      // let userInfo = userInfo = wx.getStorageSync('userInfo');
      // if(userInfo){
      //   this.globalData.userInfo = userInfo;
      //   resolve(userInfo);
      //   return
      // }

      let appUserInfo = app.globalDatas.userInfo;
      if(appUserInfo.id) {
        resolve(appUserInfo);
        return
      }

      // 查看授权
      wx.getSetting({
        success:(res) => {
          if (res.authSetting['scope.userInfo']) {
            // 登录获取 code
            wx.login({
              success: (wxLoginRes)=> {
                const code = wxLoginRes.code;
                // 获取用户信息
                wx.getUserInfo({
                  success: (wxUserInfoRes) => {
                    const userInfo = wxUserInfoRes.userInfo;
                    // 请求登录
                    wxRequest.post(API.wxlogin,{ code }).then( wxRequestRes =>{
                      userInfo.token = wxRequestRes.token;
                      userInfo.id = wxRequestRes.userInfo.id;
                      userInfo.name = wxRequestRes.userInfo.name;
                      userInfo.phone = wxRequestRes.userInfo.phone;
                      // wx.setStorage({ key: 'userInfo', data: userInfo });
                      app.globalDatas.userInfo = userInfo;
                      resolve(userInfo)
                    }).catch((err)=>{
                      reject(err)
                    })
                  },
                  fail: () => reject({ message: '微信获取用户信息失败' })
                })
              },
              fail: ()=> reject({ message: '微信登录失败' })
            })
          }else{
            reject({ message: '用户没有授权' })
          }
        },
        fail: ()=> reject({ message: '微信获取用户授权失败' }),
      })
    })
  },
}
