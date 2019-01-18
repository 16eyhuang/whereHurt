// pages/member/checkReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testid: 0,
    disease_name:null,
    result: null,
    checked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.testid)
    var that = this
    var testid = options.testid
    var disease_name = options.disease_name
    var result = wx.getStorageSync(testid)
    for (var i in result) {
      if (result[i]['choose'] === "否") {
        result[i]['choose'] = false
      }
      else if (result[i]['choose'] === "是") {
        result[i]['choose'] = true
      }
      else if (result[i]['choose'] === "不痛") {
        result[i]['choose'] = false
      }
      else if (result[i]['choose'] === "痛能继续 ") {
        result[i]['choose'] = true
      }
      else if (result[i]['choose'] === "痛无法继续 ") {
        result[i]['choose'] = true
      }
      else if (result[i]['name'] === "组合结果") {
        var obj = result[i]
        obj["choose"] = true
        result[i] = obj
        that.setData({
          checked:true
        })
      }
    }

    that.setData({
      testid: testid,
      disease_name: disease_name,
      result: result
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