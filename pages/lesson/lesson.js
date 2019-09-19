import indexService from '../../global/service/index.js';
const app = getApp();

Page({
  data:{
    pageShow: false,
    userInfo: {},
    class_id: null,
    lessons: [],
    showApply: true,
  },
  onLoad: function(option) {
    console.log(option)
    this.getData(option.class_id)
  },
  getData:function(class_id){
    app.getUserInfo().then(userInfo => {
      indexService.classItem(userInfo.id, class_id).then( res => {
        this.setData({
          pageShow: true,
          userInfo: userInfo,
          lessons: res.lessons,
          class_id: class_id,
        })
      })
    })
  },
  handleApplyLeave(e) {
    let id = e.target.dataset.id;
    let index = e.target.dataset.index;
    let user_id = e.target.dataset.user_id;
    let class_id = e.target.dataset.class_id;
    let lesson_id = e.target.dataset.lesson_id;
    let lesson = this.data.lessons[index];
    wx.showModal({
      title: "确认请假时间",
      content: `${lesson.date} ${lesson.start_time}`,
      confirmText: "确定",
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: "加载中", mask: true });
          indexService.leaveApply(id,{
            user_id, class_id, lesson_id
          }).then(() => {
            let lessons = this.data.lessons;
            lessons[index].status = 2;
            this.setData({ lessons });
          }).finally(()=>{
            wx.hideLoading();
          })

        }
      }
    })
  }
})