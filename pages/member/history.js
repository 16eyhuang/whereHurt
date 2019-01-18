const GURL = "https://wx.med.stu.edu.cn/selftest/api.php?action=getop_details";
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
      userid: app.globalData.userid
    })
    console.log(that.data.userid)
    var opid = wx.getStorageSync('opid')
    var url = GURL + "&opid=" + opid
    API.fetchGet(url, (err, data) => {
      console.info(data)
      that.setData({
        info: data,
        showLoading: false,
        showContent: true
      })
      console.log(that.data.info)
      console.log(that.data.info.test)
      wx.setStorage({
        key: 'test',
        data: that.data.info.test,
      })
    });
  },
  toCheckReport: function (e) {
    console.info(e)
    var result = e.currentTarget.dataset.result
    var testid = e.currentTarget.dataset.testid
    var disease_name = e.currentTarget.dataset.disease_name
    wx.setStorage({
      key: testid,
      data: result,
    })
    wx.setStorage({
      key: 'testid',
      data: testid,
    })
    wx.navigateTo({
      url: '/pages/member/checkReport?testid=' + testid + '&disease_name=' + disease_name,
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