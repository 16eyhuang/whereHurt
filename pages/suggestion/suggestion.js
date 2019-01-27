// pages/suggestion/suggestion.js
const GURL = "https://wx.med.stu.edu.cn/selftest/api.php?";
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
    checked:false,
    showLoading: true,
    showContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options)
    var that = this;
    that.setData({
      checked:options.checked
    })
    console.log(that.data.checked)
    if (that.data.checked==='true'){
      var url = GURL + "action=getDisease_detail&id=" + options.id
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
    }
    else if(that.data.checked === 'false') {
      var formdata = wx.getStorageSync('formdata')
      var location = formdata.location
      if (location === "肘部") {
        var id = 3
      }
      else if (location === "踝部") {
        var id = 4
      }
      else if (location === "膝部") {
        var id = 5
      }
      else if (location === "肩部") {
        var id = 6
      }
      var url = GURL + "action=getBw_detail&id=" + id
      API.fetchGet(url, (err, data) => {
        console.info(data)
        that.setData({
          info: data.data,
          showLoading: false,
          showContent: true
        })
      })
    }
    
  },
  toFinalReport:function(){
    wx.navigateTo({
      url: '/pages/member/history',
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