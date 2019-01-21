// pages/member/userinfo.js
var Util = require("../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata: {
      gender: '',
      age: '',
      height: '',
      weight: '',
      sport: '',
      frequency: '',
      id: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let currentList=wx.getStorageSync('listInfo')||''
    console.log(currentList)
    if(currentList!=''){
      that.setData({
        currentList
      })
    }
  },
  formSubmit: function (e) {
    var formdata = e.detail.value
    formdata.mobile=formdata.gender
    console.log(formdata)
    formdata.isData = 0
    formdata.id = app.globalData.userid.id
    var regAge = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;    //年龄在0-120之间
    var regHeight = /^(?:[1-9][0-9]?|[12][0-9][0-9])$/; //身高在0-300之间
    var regWeight = /^[0-9]{1,3}$/; //体重在0-999之间

    if (formdata.gender == "" || formdata.age == "" || formdata.height == "" || formdata.weight == "" || formdata.sport == "" || formdata.frequency == "") {
      wx.showModal({
        title: '错误',
        content: '您有必填项未填',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
    else if (!regAge.test(formdata.age)) {
      wx.showModal({
        title: '错误',
        content: '您的年龄输入有误',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
    else if (!regHeight.test(formdata.height)) {
      wx.showModal({
        title: '错误',
        content: '您的身高输入有误',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
    else if (!regWeight.test(formdata.weight)) {
      wx.showModal({
        title: '错误',
        content: '您的体重输入有误',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
    else {
      formdata.isData = 1
      wx.setStorage({
        key: 'listInfo',
        data: formdata,
        success: function (res) {
          console.log(formdata)
        }
      })
      wx.request({
        url: "https://wx.med.stu.edu.cn/selftest/api.php?action=saveinfo",
        data: formdata,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          wx.showToast({
            title: '提交成功',
            duration: 2000,
          })
          app.globalData.formData = res.data;
          console.log(app.globalData.formData)
          wx.navigateTo({
            url: '../../pages/USER/userListInfo',
          })
        },
        fail: function (res) {

        },
        complete: function () {

        }
      })
    }
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
  Cancal:function(){
    var listInfo=wx.getStorageSync('listInfo');
    if(listInfo.isData==1){
      wx.navigateTo({
        url: '../../pages/USER/userListInfo',
      })
    }
    else{
      wx.switchTab({
        url: '../../pages/index/index',
      })
    }
  }
})