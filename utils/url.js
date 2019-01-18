'use strict';

var HOST_URL = 'https://wx.med.stu.edu.cn/selftest/api.php';
var IMG_URL  = 'https://wx.med.stu.edu.cn/uploadfile/wx/';
var app = getApp()
module.exports = {
   getImgUrl : function(){
      return IMG_URL;
   },
   uploadImg : function(){
      return HOST_URL + '?action=uploadimg';
   },
   feedback:function(){
     var session = wx.getStorageSync("session") || app.globalData.session;
     var openid = wx.getStorageSync("openid") || app.globalData.openid;
     return HOST_URL + '?action=feedback&session=' + session + "&openid=" + openid;
   }
}