Page({
  data:{
    course:[],
  },
  onLoad:function(options){
    this.getData();
  },
  getData:function(){
    wx.request({
      url:"http://localhost:3000/api/course",
      success:(res)=>{
        this.setData({
          course:res.data.data.datas
        });
      }
    })
  },
})