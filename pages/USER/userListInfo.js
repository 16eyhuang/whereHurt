// pages/USER/userListInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       gender: '',
       age: '',
       height: '',
       weight: '',
       sport: '',
       frequency: '',
       isData:0,
       sex: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var formdata=wx.getStorageSync('listInfo')
      console.log(formdata)
      if(formdata.isData!=1){
        wx.navigateTo({
          url: '../../pages/member/userinfo',
        })
      }
      else{
      this.setData({
        gender: formdata.gender,
        age: formdata.age,
        height: formdata.height,
        weight: formdata.weight,
        sport: formdata.sport,
        frequency: formdata.frequency,
        isData: formdata.isData,
      })
      if(this.data.gender==0){
        this.setData({
          sex:'男'
        })
      }
      else{
        this.setData({
          sex:'女'
        })
      }
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
  Back: function () {
    wx.switchTab({
      url: '../../pages/member/member',
    })
  },
  Modify:function(){
    wx.navigateTo({
      url: '../../pages/member/userinfo',
    })
  }
})