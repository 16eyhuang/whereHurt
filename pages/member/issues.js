//issues.js
//获取应用实例
import { getImgUrl, uploadImg, feedback } from '../../utils/url';
var Util = require("../../utils/util");
var app = getApp();
Page({
  data: {
    imgLen: 0,
    upload: false,
    uploading: false,
    img_path: getImgUrl(),
    imgs : [],
    showError: false,
    formData: {
       title: '',
       content: '',                 
       imgs: [],
    },
    userid: null
  },
  onLoad: function(){
    var that = this
    that.setData({
      userid: app.globalData.userinfo.userid
    })
    console.log(that.data.userid)
    
  },
  listenerTitle: function (e) {
    this.setData({
      'formData.title': e.detail.value
    });
  },
  listenerTextarea: function (e) {
    this.setData({
      'formData.content': e.detail.value
    });
  },
  choosePhoto: function() {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '上传图片需要消耗流量，是否继续？',
      confirmText: '继续',
      success: function(res) {
        if (res.confirm) {
          wx.chooseImage({
            count: 4,
            sourceType: ['album'],
            success: function (res) {

              var tempFilePaths = res.tempFilePaths, imgLen = tempFilePaths.length;
              _this.setData({
                uploading: true,
                imgLen: _this.data.imgLen + imgLen
              });
              tempFilePaths.forEach(function(e){
                _this.uploadImg(e);
              });
            }
          });
        }
      }
    });
  },
  uploadImg: function(path){
    console.log(path)
    var _this = this;
    var p = path.split("//");
    var fn = p[1];
    wx.showNavigationBarLoading();
    // 上传图片
    wx.uploadFile({
       url: uploadImg(),
      header: {
        'Content-Type': 'multipart/form-data'
      },
      filePath: path,
      formData:{
         'fn': fn
      },
      name: 'file',
      success: function(res){
        console.log(res)
        if(res.statusCode==200)
        {
           var data = JSON.parse(res.data);
           console.log(data)
           if (data.key) {
              _this.setData({
                 "formData.imgs": _this.data.formData.imgs.concat(data.key),
                 imgs: _this.data.imgs.concat(_this.data.img_path + data.key)
              });
           }
         
        }else if(res.statusCode == 413)
        {
           app.showErrorModal("上传文件太大", '上传失败');
           _this.setData({
              imgLen: _this.data.imgLen - 1
           });
        }else{
           app.showErrorModal("上传文件失败", '上传失败');
           _this.setData({
              imgLen: _this.data.imgLen - 1
           });
        }
        if (_this.data.formData.imgs.length === _this.data.imgLen) {
           _this.setData({
              uploading: false
           });
        }
      },
      fail: function(res){
        _this.setData({
          imgLen: _this.data.imgLen - 1
        });
        console.info(res)
      },
      complete: function() {
        wx.hideNavigationBarLoading();
      }
    });
  },
  previewPhoto: function(e){
    var _this = this;
    //预览图片
    if(_this.data.uploading){
      app.showErrorModal('正在上传图片', '预览失败');
      return false;
    }
    wx.previewImage({
       current: _this.data.img_path + _this.data.formData.imgs[e.target.dataset.index],
       urls: _this.data.imgs
    });
  },
  submit: function(){
    var _this = this, data = this.data.formData;
   
    _this.setData({
      showError: true
    });

    if (_this.data.uploading || !data.title || !data.content){
      return false;
    }

    if (_this.data.imgLen>0)
    {
       data.imgs = Util.json2Form_2(data.imgs);
    }

    wx.showModal({
      title: '提示',
      content: '是否确认提交反馈？',
      success: function(res) {
         if (res.confirm) {
          app.showLoadToast();
          wx.request({
            url: feedback(),
            data: data,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function(res){
              if(res.data === 1){
                var text = '反馈成功，谢谢您的支持';
                wx.showModal({
                  title: '反馈成功',
                  content: text,
                  showCancel: false,
                  success: function(res) {
                    wx.navigateBack();
                  }
                });
              }else{
                app.showErrorModal(res.data.message, '提交失败');
              }
            },
            fail: function(res) {
              app.showErrorModal(res.errMsg, '提交失败');
            },
            complete: function() {
              wx.hideToast();
            }
          });
        }
      }
    });
  }
});