import authService from './global/service/auth.js';

App({
  globalDatas: {
    userInfo: {},
  },
  getUserInfo: authService.getUserInfo,
})