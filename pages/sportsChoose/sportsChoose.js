// pages/sportsChoose/sportsChoose.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata:{
      userid:null,
      sports:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    that.setData({
      'formdata.userid':app.globalData.userid
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
  choose:function(e){
    let price = 'formdata.' + e.currentTarget.dataset.name
    let value = e.currentTarget.dataset.value
    let that=this
    that.setData({
      [price]:value
    })
  },
  next:function(){
    let that=this
    let formdata=that.data.formdata
    if(formdata.sports=='网球'){
      wx.navigateTo({
        url: 'sportsTest/sportsTest?sports='+formdata.sports,
      })
    }
    else{
      wx.showToast({
        title: '暂未开放该运动的检查',
        icon: "none"
      })
    }
  }
})