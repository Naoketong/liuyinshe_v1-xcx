const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function(){
    this.getData();
  },
  getData: function() {
    app.getUserInfo().then( userInfo => {
      console.log(userInfo)
      this.setData({ userInfo })
    })
  }
})