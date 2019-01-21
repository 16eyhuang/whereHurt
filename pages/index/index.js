Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '',
    height: '',
  },
  onLoad(e) {
    var that = this
    try {
      var res = wx.getSystemInfoSync();
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      this.setData({
        width: windowWidth,
        height: windowHeight
      })
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    };
    wx.setStorageSync('showModal', false)

    // var listInfomation=wx.getStorageSync('listInfo');
    // console.log(listInfomation)
    //  if(listInfomation.isData!=1){
    // wx.showModal({
    //   title: '温馨提示',
    //   content: '如果您是第一次使用，请先在“用户信息”里完善个人基本信息',
    //   confirmText: '前往完善',
    //   confirmColor: "#2fcabb",
    //   success: function (res) {
    //     if (res.confirm) {
    //       wx.navigateTo({
    //         url: '/pages/member/userinfo',
    //       })
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    // }
  },
  onShow: function () {

  },

  toUserCenter: function () {
    wx.navigateTo({
      url: '/pages/member/userinfo',
    })
  },
  toNotice: function () {
    wx.navigateTo({
      url: '/pages/member/about',
    })
  },
  LocationChoose() {
    wx.navigateTo({
      url: '/pages/locationChoose/locationChoose',
    })
  },
  SportsChoose() {
    wx.navigateTo({
      url: '/pages/sportsChoose/sportsChoose',
    })
    /*wx.showToast({
      title: '敬请期待',
      icon: "none"
    })*/
  },
})
