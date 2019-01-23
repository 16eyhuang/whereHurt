const GURL = "https://wx.med.stu.edu.cn/selftest/api.php?action=listop";
var API = require("../../utils/api");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: null,
    info: '',
    showLoading: true,
    showContent: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userid: app.globalData.userinfo.userid
    })
    console.log(that.data.userid)
    var userid = that.data.userid
    var opid = wx.getStorageSync('opid')
    console.log(opid)
    var url = GURL + "&userid=" + userid
    API.fetchGet(url, (err, data) => {
      console.info(data)
      that.setData({
        info: data,
        showLoading: false,
        showContent: true
      })
      console.log(that.data.info)
      wx.setStorage({
        key: 'test',
        data: that.data.info.test,
      })
    });
  },
  toCheckReport: function (e) {
    console.info(e)
    var opid = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/member/checkReport?opid='+opid,
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
  ReCheck: function () {
    wx.navigateTo({
      url: '../../pages/locationChoose/locationChoose',
    })
  },
  Back: function () {
    wx.switchTab({
      url: '../../pages/index/index',
    })
  }
})