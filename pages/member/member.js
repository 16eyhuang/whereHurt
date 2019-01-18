const app = getApp()
var API = require("../../utils/api");
var Util = require("../../utils/util");
// 创建一个页面对象用于控制页面的逻辑
Page({
   data: {
      title: '',
      loading: true,
      userInfo: {
      },
   },

   onLoad(option) {
      //调用应用实例的方法获取全局数据
      this.setData({
        userInfo: app.globalData.userInfo
      });
   },

   onShow() {

   }
   

})
