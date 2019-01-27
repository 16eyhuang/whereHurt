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
    showContent: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    function timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }

    var that = this;
    that.setData({
      userid: app.globalData.userinfo.id
    })
    console.log(that.data.userid)
    var userid = that.data.userid
    var opid = wx.getStorageSync('opid')
    console.log(opid)
    var url = GURL + "&userid=" + userid
    API.fetchGet(url, (err, data) => {
      console.info(data)
      data=data.reverse()   //数组顺序倒转
      for(let i in data){
        data[i].real_time=timestampToTime(data[i].create_time)
      }

      /*设定显示的数量以及点击加载更多 */
      let showList=data.slice(0,10)
      let currentShowNumber=10
      let showText=''
      if(currentShowNumber<data.length){
        showText='点击加载更多'
      }
      else{
        showText='已加载完毕'
      }
      that.setData({
        showText,
        showList,
        currentShowNumber,
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
    wx.hideLoading()
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
  },

  /*加载更多 */
  loadMore:function(e){
    let that = this
    let info = that.data.info
    let currentShowNumber=that.data.currentShowNumber
    let showText=e.currentTarget.dataset.text
    let showList=[]
    if(showText=='点击加载更多'){
      if((currentShowNumber+10)<info.length){
        currentShowNumber+=10
        showList=info.slice(0,currentShowNumber)
      }
      else if((currentShowNumber+10)>=info.length){
        currentShowNumber=info.length
        showList=info.slice(0,currentShowNumber)
        showText='已加载完毕'
      }
      that.setData({
        currentShowNumber,
        showList,
        showText
      })
    }
    // if((currentShowNumber+10)<info.length){

    // }
  }
})