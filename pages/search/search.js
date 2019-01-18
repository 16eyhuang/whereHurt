var API = require("../../utils/api");
const GURL = "https://wx.med.stu.edu.cn/selftest/api.php?";
var app = getApp()
Page({
   data: {
      name:'',
      maskShow:false,
      suggestDataList:[],
      diseaseList:[]
   },
   onLoad: function () {
      
   },
   choose:function(e){
     var that=this
     console.log(e)
     that.setData({
      name: e.currentTarget.dataset.name
    })
     console.log(e.currentTarget.dataset.name)
     var name = that.data.name
     var url = GURL + "action=getDiseaseByBw&key=" + name
    API.fetchGet(url, (err, data) => {
      console.info(data)
      that.setData({
        diseaseList: data
      })
      console.info(that.data.diseaseList)
      wx.setStorage({
        key: 'diseaseList',
        data: data,
      })
      wx.navigateTo({
        url:'./list?name='+name,
      })
    });
    
   },
   inputBind: function (e) {
      console.info(e.detail.value)
      var that = this;
      var url = GURL + "action=getSearchDisease&search="+e.detail.value
      API.fetchGet(url, (err, data) => {
            console.info(data)
            that.setData({
               suggestDataList:data
            })
            console.info(that.data.suggestDataList)
      });
   },
   inputTap: function () {
      this.setData({
         maskShow: true
      });
   },
   goto: function(e){
      console.info(e);
   }
})
