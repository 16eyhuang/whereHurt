// pages/sportsChoose/sportsTest/sportsTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        content: "运动量",
        choose_items: [
          'a. <3小时',
          'b. 3-5小时',
          'c. >5小时'
        ],
        question: '你平均一周花多长时间打网球？',
        imgs: []
      },
      {
        content: "握拍姿势",
        choose_items: [
          'a. 东方式',
          'b. 西方式',
          'c. 半西方式',
          'd. 大陆式'
        ],
        question: '你的握拍姿势是？',
        imgs: []
      },
      {
        content: "肩部状况",
        choose_items: [
          'a. 有，症状明显，持续很长时间',
          'b. 有，但症状较轻，休息后可缓解和消失',
          'c. 没有发现肩部酸痛',
        ],
        question: '在结束运动后，你是否曾感觉肩部酸痛？',
        imgs: []
      },
    ],
    sports:'',
    currentPage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    that.setData({
      sports:options.sports
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  swiperChange:function(e){
    console.log(e)
    let that=this
    that.setData({
      currentPage:e.detail.current
    })
  },
  radioChange:function(e){
    console.log(e)
    let that=this
    let steps=that.data.steps
    let currentPage=that.data.currentPage
    steps[currentPage].value=e.detail.value
  },
  last:function(){
    let that=this
    let currentPage=that.data.currentPage
    if(currentPage==0){
      wx.showToast({
        title: '没有上一步啦',
        icon: "none"
      })
      return
    }
    else{
      currentPage-=1
      that.setData({
        currentPage:currentPage
      })
    }
  },
  next:function(){
    let that=this
    let currentPage=that.data.currentPage
    currentPage+=1
    that.setData({
      currentPage:currentPage
    })
  },
  submit:function(){
    let that=this
    let currentPage=that.data.currentPage
    let steps=that.data.steps
    let valuestr=''
    for(let i=0;i<=currentPage;i++){
      if(!steps[i].value){
        wx.showToast({
          title: '您还有必选项未选，请检查一下',
          icon: "none"
        })
        return
      }
      else{
        valuestr+=steps[i].value.substring(0,1)
        valuestr+=","
      }
    }
    valuestr=valuestr.substring(0,valuestr.length-1)
    console.log(valuestr)
    wx.navigateTo({
      url: '../sportsReport/sportsReport?valuestr='+valuestr,
    })
  }
})