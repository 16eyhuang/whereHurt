// pages/testReport/testReport.js
var API = require("../../utils/api");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_result: '',
    diagnosis: [],
    pics: [],
    testReport: {},
    disease_name:'',
    disease_id:'',
    currentTap: 0,
    const_url: "https://wx.med.stu.edu.cn/",
    checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      testReport: wx.getStorageSync('testReport'),
      disease_name: options.disease_name,
      disease_id: options.disease_id
    })
    var testReport = that.data.testReport;

    var last = testReport[testReport.length - 1];
    console.log(testReport.length)
    console.info(last)
    if(last['name']==='组合结果'){
      that.setData({
        checked:true
      })
    }
    console.log(that.data.checked)
      wx.getStorage({
        key: 'diagnosis',
        success: function (res) {
          that.setData({
            diagnosis: res.data
          })
        },
      })
    wx.getStorage({
      key: 'pics',
      success: function (res) {
        that.setData({
          pics: res.data
        })
      },
    })
  },
  toDisease(e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.id;
    console.info(id)
    wx.navigateTo({
      url: '/pages/disease/disease?id=' + id,
    })
  },
  toTest(e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.id;
    console.info(id)
    wx.navigateTo({
      url: '/pages/test/test?id=' + id,
    })
  },
  previewImage: function (e) {
    console.log(e)
    var id = e.currentTarget.id;
    var pics = this.data.pics;
    console.log(pics)
    wx.previewImage({
      urls: pics[id]// 需要预览的图片http链接列表  
    })
  },
  toSuggestion: function () {
    var that = this
    var id = that.data.disease_id
    var checked = that.data.checked
    wx.navigateTo({
      url: '/pages/suggestion/suggestion?id=' + id+'&checked='+checked,
    })
  },
  // 点击左右箭头
  leftArrowClicked: function (event) {
    var that = this;
    var localCurrentTap = that.data.currentTap;
    if (0 < localCurrentTap) {
      localCurrentTap -= 1;
    }
    that.setData({
      currentTap: localCurrentTap
    })
  },

  rightArrowClicked: function (event) {
    var that = this;
    var localMaxTap = that.data.diagnosis.length;
    var localCurrentTap = that.data.currentTap;
    if (localCurrentTap < localMaxTap - 1) {
      localCurrentTap += 1;
    }
    that.setData({
      currentTap: localCurrentTap
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