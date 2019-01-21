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
    wx.showLoading({
      title: '登录中',
    })
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
            wx.hideLoading()
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

              /*如果用户信息里有相关的数据，则缓存到本地，是否有数据的判断是age是否不为0 */
              let listInfo={}
              if(res.data.userinfo.age!='0'){
                listInfo.age = res.data.userinfo.age
                listInfo.frequency = res.data.userinfo.frequency
                listInfo.gender=res.data.userinfo.mobile
                listInfo.height = res.data.userinfo.height
                listInfo.id = res.data.userinfo.id
                listInfo.isData=1
                listInfo.mobile = res.data.userinfo.mobile
                listInfo.sport = res.data.userinfo.sport
                listInfo.sex = res.data.userinfo.mobile
                listInfo.weight = res.data.userinfo.weight
                wx.setStorageSync('listInfo', listInfo)
              }
              else{
                wx.showModal({
                  title: '温馨提示',
                  content: '如果您是第一次使用，请先在“用户信息”里完善个人基本信息',
                  confirmText: '前往完善',
                  confirmColor: "#2fcabb",
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '/pages/member/userinfo',
                      })
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            }
          },
          fail:function(res){
            wx.hideLoading();
            wx.showToast({
              title: '出现错误',
              icon: 'none'
            })
          }
        })
      },
      fail:function(res){
        wx.hideLoading();
        wx.showToast({
          title: '出现错误',
          icon:'none'
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

