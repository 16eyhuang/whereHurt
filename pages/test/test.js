// pages/test/test.js
const GURL = "https://wx.med.stu.edu.cn/selftest/api.php?action=getTestFromDisease";
var API = require("../../utils/api");
var Util = require("../../utils/util");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata: {
      userid: null,
      testid: "",
      opid: "",
      wj: {}
    },
    test_result: false,
    test_info: {},
    currentTap: 0,
    const_url: "https://wx.med.stu.edu.cn/",
    wj: {},
    id: 0,
    radio_checked: false,
    showLoading: true,
    showContent: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      'formdata.userid': app.globalData.userinfo.userid
    })
    console.log(that.data.formdata.userid)
    var url = GURL + "&id=" + options.id
    API.fetchGet(url, (err, data) => {
      console.info(data)
      that.setData({
        test_info: data[0],
        showLoading: false,
        showContent: true,
        'formdata.testid': data[0].id
      })
      console.log(that.data.test_info)

    });
    wx.getStorage({
      key: 'opid',
      success: function (res) {
        console.log(res)
        that.setData({
          'formdata.opid': res.data
        })
      },
    })
  },
  toDisease(e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.id;
    console.info(id)
    wx.redirectTo({
      url: '/pages/disease/disease?id=' + id,
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件,e:', e)
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件,e:', e)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var wj = e.detail.value;
    var flag=1;
    
    /*如果哪一项未填就跳转到该项 */
    let currentTap=0
    console.info(wj)
    for (let i in wj) {
      if(wj[i]===''){
        wx.showModal({
          title: '提示',
          content: '当前步骤未做完',
        })
        currentTap=Number.parseInt(i[0])
        console.log(currentTap)
        flag=0
        break
      }        
    }
    if(flag==0){
      that.setData({
        currentTap
      })
    }
    if(flag===1){
      that.setData({
        'formdata.wj': Util.json2Form(wj)
      });
      var formdata = that.data.formdata;
      console.log(formdata)
      wx.request({
        url: "https://wx.med.stu.edu.cn/selftest/api.php?action=saveusertest",
        data: formdata,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var testReport = res.data
          for (var i in testReport) {
            if (testReport[i]['choose'] === "否") {
              testReport[i]['choose'] = false
            }
            else if (testReport[i]['choose'] === "是") {
              testReport[i]['choose'] = true
            }
            else if (testReport[i]['choose'] === "不痛") {
              testReport[i]['choose'] = false
            }
            else if (testReport[i]['choose'] === "痛能继续 ") {
              testReport[i]['choose'] = true
            }
            else if (testReport[i]['choose'] === "痛无法继续 ") {
              testReport[i]['choose'] = true
            }
            else if (testReport[i]['name'] === "组合结果") {
              var obj = testReport[i]
              obj["choose"]=true
              testReport[i]=obj
            }
          }
          console.info(testReport)
          wx.setStorage({
            key: 'testReport',
            data: testReport,
          })
          var disease_name = that.data.test_info.disease_name
          var disease_id = that.data.test_info.disease_id
          console.log(res)
          wx.navigateTo({
            url: '/pages/testReport/testReport?disease_name=' + disease_name + "&disease_id=" + disease_id,
          })
        },
        fail: function (res) {
          console.log(res);
        }
      })

    }
    
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
    var localMaxTap = that.data.test_info.steps.length;
    var localCurrentTap = that.data.currentTap;
    if (localCurrentTap < localMaxTap - 1) {
      localCurrentTap += 1;
    }
    that.setData({
      currentTap: localCurrentTap
    })
  },
  swiperChange:function(e){
    console.log(e)
    var that=this
    that.setData({
      currentTap:e.detail.current
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
