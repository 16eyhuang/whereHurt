// pages/smallReport/smallReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    related_info: {},
    disease_info: {},
    test_info: {},
    showRelated_info: false,
    formdata: {},
    id: '',
    main_pic: '',
    pics: [],
    diagnosis:{},
    const_url: "https://wx.med.stu.edu.cn/",
    isdown: true,
    isdown1:true,
    isshow: true,
    currentTap: 0,
    flag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'related_info',
      success: function (res) {
        var related_info = res.data;
        var diagnosis =related_info['diagnosis'];
        wx.setStorage({
          key: 'diagnosis',
          data: diagnosis,
        })
        console.log(related_info)
        var showRelated_info = that.data.showRelated_info
        if (related_info!= false) {
          var d = res.data;
          var pics = [];
            d['main_pic'] = that.data.const_url + d['main_pic'];
            for (var index in diagnosis){
              diagnosis[index]['main_pic'] = that.data.const_url + diagnosis[index]['main_pic']
              console.log(diagnosis[index]['pics'])

              if (diagnosis[index]['pics']){
                var y = (diagnosis[index]['pics']).split(",");
                for(var i in y){
                  y[i] = that.data.const_url +y[i]
                }
                diagnosis[index]['pics'] =y
                pics[diagnosis[index]['id']]=y
              }
            }
            related_info['diagnosis'] = diagnosis
          that.setData({
            related_info: related_info,
            pics: pics,
            id: related_info.id
          })
          wx.setStorage({
            key: 'pics',
            data: that.data.pics,
          })
          console.log(that.data.related_info,that.data.pics)
        }
        else {
          that.setData({
            showRelated_info: !showRelated_info
          })
        }
      }
    })
    wx.getStorage({
      key: 'formdata',
      success: function (res) {
        that.setData({
          formdata: res.data
        })
      }
    })
    
  },
  // 点击左右箭头
  leftArrowClicked: function (event) {
    var that = this;
    var localCurrentTap = that.data.currentTap;
    if (0 < localCurrentTap) {
      localCurrentTap -= 1;
    }
    that.setData({
      currentTap: localCurrentTap
    })
  },

  rightArrowClicked: function (event) {
    var that = this;
    var localMaxTap = that.data.related_info.diagnosis.length;
    var localCurrentTap = that.data.currentTap;
    if (localCurrentTap < localMaxTap - 1) {
      localCurrentTap += 1;
    }
    that.setData({
      currentTap: localCurrentTap
    })
  },
  previewImage: function (e) {
    console.log(e)
    var id = e.currentTarget.id;
    var pics = this.data.pics;
    console.log(pics)
    wx.previewImage({
      urls: pics[id]// 需要预览的图片http链接列表  
    })
  },
  toggleDown(e) {
    var isdown = this.data.isdown
    this.setData({
      isdown: !isdown
    })
  },
  toggleDown1(e) {
    var isdown1 = this.data.isdown1
    this.setData({
      isdown1: !isdown1
    })
  },
  toDown(e) {
    var isshow = this.data.isshow
    this.setData({
      isshow: !isshow
    })
  },
  toDisease(e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.id;
    console.info(id)
      wx.navigateTo({
      url: '/pages/disease/disease?id=' +id,
      })
  },

  toTest(e) {
    console.log(e)
    var that = this;
    var id =e.currentTarget.id;
    console.info(id)

    wx.navigateTo({
      url: '/pages/test/test?id=' + id,
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