// pages/disease/disease.js
const GURL = "https://wx.med.stu.edu.cn/selftest/api.php?action=getDisease_detail";
var API = require("../../utils/api");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    picurl: "https://wx.med.stu.edu.cn/",
    scenario_pics: [],
    clinic_pics: [],
    isdown: true,
    isdown1: true,
    isdown2: true,
    showLoading: true,
    showContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options)
    var that = this;
    var url = GURL + "&id=" + options.id
    API.fetchGet(url, (err, data) => {
      console.info(data)
      that.setData({
        info: data.data,
        showLoading: false,
        showContent: true
      })
      var info = that.data.info
      var scenario_pics = info.scenario_pics;
      var clinic_pics = info.clinic_pics
      var x = scenario_pics.split(",")
      var y = clinic_pics.split(",")
      for (var i in x) {
        x[i] = that.data.picurl + x[i]
      }
      for (var i in y) {
        y[i] = that.data.picurl + y[i]
      }
      that.setData({
        scenario_pics: x,
        clinic_pics: y
      })
    });
  },
  toTest:function(e){
    console.log(e)
    var id=e.currentTarget.id
    wx.redirectTo({
      url: '/pages/test/test?id='+id,
    })

  },
  toggleDown(e) {
    var isdown = this.data.isdown
    this.setData({
      isdown: !isdown
    })
  },
  toggleDown1(e) {
    var isdown1 = this.data.isdown1
    this.setData({
      isdown1: !isdown1
    })
  },
  toggleDown2(e) {
    var isdown2= this.data.isdown2
    this.setData({
      isdown2: !isdown2
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

  }
})