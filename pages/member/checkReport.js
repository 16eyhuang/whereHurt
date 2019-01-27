// pages/member/checkReport.js
const GURL = "https://wx.med.stu.edu.cn/selftest/api.php?action=getop_details";
var API = require("../../utils/api");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opid:null,
    info:null,
    id: 0,
    disease_name:null,
    result: null,
    checked:false,
    currentPage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      opid: options.opid
    })
    var url = GURL + "&opid=" + options.opid
    API.fetchGet(url, (err, data) => {
      console.info(data)
      that.setData({
        info: data,
        test:data.test,
        showLoading: false,
        showContent: true
      })
      console.log(that.data.info.test)
    });


    // var id = options.id
    // var disease_name = options.disease_name
    // var result = wx.getStorageSync(id)
    // for (var i in result) {
    //   result[i].isdown=true
    //   if (result[i]['choose'] === "否") {
    //     result[i]['choose'] = false
    //   }
    //   else if (result[i]['choose'] === "是") {
    //     result[i]['choose'] = true
    //   }
    //   else if (result[i]['choose'] === "不痛") {
    //     result[i]['choose'] = false
    //   }
    //   else if (result[i]['choose'] === "痛能继续 ") {
    //     result[i]['choose'] = true
    //   }
    //   else if (result[i]['choose'] === "痛无法继续 ") {
    //     result[i]['choose'] = true
    //   }
    //   else if (result[i]['name'] === "组合结果") {
    //     var obj = result[i]
    //     obj["choose"] = true
    //     result[i] = obj
    //     that.setData({
    //       checked:true
    //     })
    //   }
    // }

    // var last = result[result.length - 1];
    // if (last['name'] === '组合结果') {
    // }
    // else {
    //   let obj = {}
    //   obj.name = '组合结果'
    //   obj.choose = true
    //   obj.result = '根据您的检查，您患有' + options.disease_name + '疾病的可能性小，但仍不能排除您患有其他疾病的可能性。'
    //   obj.isdown = true
    //   result.push(obj)
    // }

    // that.setData({
    //   id: id,
    //   disease_name: disease_name,
    //   testReport: result
    // })
  },
  toReviewReport:function(e){
    console.info(e)
    var disease_name = e.currentTarget.dataset.disease_name
    var result = e.currentTarget.dataset.result
    var id = e.currentTarget.id
    wx.setStorageSync('id', id)
    wx.setStorageSync(id, result)
    wx.navigateTo({
      url: 'reviewReport?disease_name=' + disease_name + '&id=' + id,
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