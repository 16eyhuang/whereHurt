//app.js
App({
  onLaunch: function () {
    var that = this;
    this.login();
  },
  onLoad() {

  },

  //登陆接口，登陆成功后设置，全局用户信息
  login: function (cb) {
    var that = this;
    wx.login({
      //获取授权码code
      success: function (e) {
        //console.info("授权码code");//
        //console.info(e.code);//
        //获取用户信息接口
        wx.request({
          url: "https://wx.med.stu.edu.cn/selftest/api.php?action=get_userinfo",
          data: {
            code: e.code,
            appid: "wx668b0d0c172aff71",
            appsecret: "81f7446cf9d6e7a349b29cdc620afddd",
          },

          //登录成功，则保存token到本地
          success: function (res) {
            console.info(res)
            if (res.data.status === true) {
              console.info("登陆成功，则保存token到本地");
              wx.setStorageSync('token', res.data);
              that.globalData.userid = res.data.userinfo
              that.globalData.openid = res.data.openid
              that.globalData.session = res.data.session
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('session', res.data.session)
              console.info(that.globalData.userid)
            }
          }
        })
      }
    })
  },
  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function (title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      mask: true,
      duration: duration || 10000
    });
  },

  //全局数据
  globalData: {
    userid: null,
    openid: null,
    session:null
  }
})

