let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    choose_page: 1,
    formdata: {
      location: '',
      strength: '',
      quality: '',
      disease_id: '',
      userid: null
    },
    diagnosis:[],
    choose_info: {},
    related_info: {},
    const_url: "https://wx.med.stu.edu.cn/",
    pics: [],
    items: [],
    currentTap: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    that.setData({
      'formdata.userid': app.globalData.userinfo.userid
    })
    console.log(that.data.formdata.userid)
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
  },

  next: function () {
    var choose_page = this.data.choose_page;
    var location=this.data.formdata.location
    var strength=this.data.formdata.strength
    var quality=this.data.formdata.quality
    if(choose_page==1){
      if(location){
        this.setData({
          choose_page: parseInt(choose_page) + 1,
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: '您还没有选择部位',
        })  
      }
    }
    if(choose_page==2){
      if(strength){
        this.setData({
          choose_page:parseInt(choose_page)+1
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: '您还没有选择强度',
        })
      }
    }
    if(choose_page==3){
      if(quality){
        this.setData({
          choose_page:parseInt(choose_page)+1
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: '您还没有选择损伤的性质',
        })
      }
    }
    console.log(choose_page)
  },
  last: function (e) {
    var choose_page = this.data.choose_page;
    this.setData({
      choose_page: parseInt(choose_page) - 1,
    })
  },
  choose(e) {
    console.log(e)
    var price = 'formdata.' + e.currentTarget.dataset.name;
    var v = e.currentTarget.dataset.value
    var choose_page = e.currentTarget.dataset.choose_page;
    var that = this;
    that.setData({
      [price]: v,
    })
    console.log(that.data)
    /*if (choose_page == 1) {
      that.setData({
        choose_page: parseInt(choose_page) + 1,
      })
    }*/
    wx.setStorage({
      key: 'formdata',
      data: this.data.formdata,
    })
    
    var formdata = this.data.formdata;
    if (choose_page == 2 && (v === '高强度')) {
      wx.showModal({
        title: '说明',
        content: '高强度损伤通常由强大的外力引起,一般造成急性损伤.如坠落.剧烈对撞，脱位,骨折等严重后果',
        confirmText: '确定',
        confirmColor:"#2fcabb",
        showCancel: true,
        success: function (res) {
          /*if (res.confirm) {
            that.setData({
              choose_page: parseInt(choose_page) + 1,
            })
          }*/
        }
      })
    }
    else if (choose_page == 2 && (v === '低强度')) {
      wx.showModal({
        title: '说明',
        content: '低强度损伤的外力通常不强,如扭伤等.此损伤易累积,形成慢性运动损伤.对于脆弱的结构,低强度损伤足以超负荷造成急性运动损伤.',
        confirmText: '确定',
        confirmColor: "#2fcabb",
        showCancel: true,
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            /*that.setData({
              choose_page: parseInt(choose_page) + 1,
            })*/
          }
        }
      })
    }
    if (choose_page == 3 && (v === '急性')) {
      wx.showModal({
        title: '说明',
        content: '急性损伤,即原本完好的身体组织在超负荷的外力作用下,突然受损.病人一般在急性损伤发生后,立即产生相应的症状.',
        confirmText: '确定',
        confirmColor: "#2fcabb",
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            /*that.setData({
              choose_page: parseInt(choose_page) + 1,
            })*/
          }
        }
      })
    }
    else if (choose_page == 3 && (v === '慢性')) {
      wx.showModal({
        title: '说明',
        content: '慢性运动损伤常由劳损引起.慢性损伤的症状由弱到强，早期损伤可不伴疼痛,难以觉察.例如，髂胫束综合症(跑步膝)，网球肘',
        confirmText: '确定',
        confirmColor: "#2fcabb",
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            /*that.setData({
              choose_page: parseInt(choose_page) + 1,
            })*/
          }
        }
      })
    }
    //提交POST 
    if (choose_page == 3) {
      wx.request({
        url: "https://wx.med.stu.edu.cn/selftest/api.php?action=postanalyse",
        data: formdata,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          var d = res.data;
          var items = [];
          var pics = [];
          for (var index in d) {
            items = d;
            if (d[index]['pics']) {
              var x = (d[index]['pics']).split(",")
              for (var i in x) {
                x[i] = that.data.const_url + x[i]
              }
              console.log(x)             
            }
            pics[d[index]['id']] = x
            items[index].main_pic = that.data.const_url + d[index]['main_pic'];
            items[index].pics = pics[d[index]['id']]
          }
          console.log(items)
          that.setData({
            items: items,
            pics: pics,
            "formdata.disease_id": items[0]['id'],
            choose_info:items[0]
          })
          wx.setStorage({
            key: 'items',
            data: items,
          })
        },
        fail: function (res) {
          console.log(res);
        }
      })

      wx.getStorage({
        key: 'posture',
        success: function (res) {
          console.info(res.data)
        },
      }),
        setTimeout(function () {
          this.setData({
            target: 'workFlow',
          })
        }.bind(this), 20)
      setTimeout(function () {
        this.setData({
          scroll: false,
        })
      }.bind(this), 300)
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
    var localMaxTap = that.data.items.length;
    var localCurrentTap = that.data.currentTap;
    if (localCurrentTap < localMaxTap - 1) {
      localCurrentTap += 1;
    }
    that.setData({
      currentTap: localCurrentTap
    })
  },
  swiper: function (e) {
    var current = e.detail.current;
    var items = this.data.items;
    this.setData({
      "formdata.disease_id": items[current].id,
       choose_info:items[current]
    })
    console.log(items[current])

  },

  previewImage: function (e) {
    console.info(e)
    var id =e.currentTarget.id
    var current = e.currentTarget.dataset.current
    var pics=this.data.pics
    wx.previewImage({
      urls: pics[id]// 需要预览的图片http链接列表  
    })
  },

  //跳转到初步报告
  tosmallReport(e) {
    var choose_info = this.data.choose_info;
    var currentTap = this.data.currentTap;
    var formdata = this.data.formdata;
    var disease_id = this.data.disease_id;
    var diagnosis = this.data.diagnosis;
    console.info(formdata)
    wx.request({
      url: "https://wx.med.stu.edu.cn/selftest/api.php?action=postOp",
      data: formdata,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.info(res)
       wx.setStorage({
         key: 'opid',
         data: res.data.opid,
       })

        wx.setStorage({
          key: 'related_info',
          data: res.data,
        })
        console.log(res.data)
        wx.navigateTo({
          url: '/pages/smallReport/smallReport',
        })
      },
      fail: function (res) {
      }
    })
  },

})