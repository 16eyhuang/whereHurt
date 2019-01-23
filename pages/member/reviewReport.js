// pages/member/reviewReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disease_name:null,
    result:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.info(options)
    var disease_name = options.disease_name
    var id = options.id
    var result = wx.getStorageSync(id)
    console.info(disease_name, result)
    for (var i in result) {
      result[i].isdown = true
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
          checked: true
        })
      }
    }

    var last = result[result.length - 1];
    if (last['name'] === '组合结果') {
    }
    else {
      let obj = {}
      obj.name = '组合结果'
      obj.choose = true
      obj.result = '根据您的检查，您患有' + options.disease_name + '疾病的可能性小，但仍不能排除您患有其他疾病的可能性。'
      obj.isdown = true
      result.push(obj)
    }
    that.setData({
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

  },
  /*切换swiper页面 */
  swiperChange: function (e) {
    let that = this
    that.setData({
      currentPage: e.detail.current
    })
    console.log(that.data.currentPage)
  },
  click: function (e) {
    let that = this
    let testReport = that.data.result
    let currentPage = that.data.currentPage
    testReport[currentPage].isdown = !testReport[currentPage].isdown
    that.setData({
      result: testReport
    })
  },
})