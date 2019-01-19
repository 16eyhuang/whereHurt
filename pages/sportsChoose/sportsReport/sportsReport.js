// pages/sportsChoose/sportsReport/sportsReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes:[
      {
        rules:"a",
        content:"网球运动可以增强人的心肺功能，肌肉力量等，有着诸多益处。研究表面，您每周的运动时长不会显著提升各种运动损伤的发病率。",
        suggestion:"您可以继续保持现有的运动时长。若你准备进一步增加打球的时间，建议您再次使用我们哪儿疼平台，进行持续的运动损伤监控。",
        isTest:false,
      },
      {
        rules: "b",
        content: "网球运动可以增强人的心肺功能，肌肉力量等，有着诸多益处。但研究指出，您每周的运动时长，会显著提升各种运动损伤的发病率。",
        suggestion: "我们建议您进行损伤评估 以排查潜在的损伤。建议你在享受网球带来的身心益处之余，注意观察身体状况，注意休息。",
        isTest: true,
      },
      {
        rules: "c",
        content: "网球运动可以增强人的心肺功能，肌肉力量等，有着诸多益处。但研究指出，您每周的运动时长，会提升各种运动损伤的发病率，尤其是网球肘。",
        suggestion: "我们建议您进行损伤评估 以排查潜在的损伤。建议你在享受网球带来的身心益处之余，注意观察身体状况，注意休息。",
        isTest: true,
      },
    ],
    tags:[
      {
        value:"运动量小",
        show:false
      },
      {
        value: "运动量中等",
        show: false
      },
      {
        value: "运动量大",
        show: false
      },
      {
        value: "东方式握拍",
        show: false
      },
      {
        value: "西方式握拍",
        show: false
      },
      {
        value: "半西方式握拍",
        show: false
      },
      {
        value: "大陆式握拍",
        show: false
      },
      {
        value: "肩受伤过",
        show: false
      },
      {
        value: "肩不舒服",
        show: false
      },
      {
        value: "肩膀ok",
        show: false
      },
    ],
    answer1:[
      {
        rules:'a',
        report:'网球运动可以增强人的心肺功能，肌肉力量等，有着诸多益处。研究表明，您每周的运动时长不会显著提升各种运动损伤的发病率。【1】您可以继续保持现有的运动时长。若你准备进一步增加打球的时间，建议您再次使用我们哪儿疼平台，进行持续的运动损伤监控。',
        head:'低风险',
        summary:'您的运动时长一般不诱发运动损伤',
        tag:'运动量小',
        isTest:false
      },
      {
        rules: 'b',
        report: '网球运动可以增强人的心肺功能，肌肉力量等，有着诸多益处。但研究指出，您每周的运动时长，会显著提升各种运动损伤的发病率。我们建议您进行损伤评估 以排查潜在的损伤。建议你在享受网球带来的身心益处之余，注意观察身体状况，注意休息。',
        head: '存在风险',
        summary: '您的运动时长偏高',
        tag: '运动量中等',
        isTest: false
      },
      {
        rules: 'c',
        report: '网球运动可以增强人的心肺功能，肌肉力量等，有着诸多益处。但研究指出，您每周的运动时长，会提升各种运动损伤的发病率，尤其是网球肘。我们建议您进行损伤评估 以排查潜在的损伤。建议你在享受网球带来的身心益处之余，注意观察身体状况，注意休息。',
        head: '高风险',
        summary: '您的运动时长可能诱发运动损伤',
        tag: '运动量大',
        isTest: true
      },
    ],
    answer2:[
      {
        rules: 'a',
        report: '与桡侧腕屈肌腱炎，桡骨腕伸肌腱鞘炎相关',
        head: '存在风险',
        summary: '您的握拍姿势与运动损伤相关',
        tag: '东方式握拍',
        isTest: false
      },
      {
        rules: 'b',
        report: '伸肌肱肌腱炎相关，具体表现为blablabla症状',
        head: '存在风险',
        summary: '您的握拍姿势与运动损伤相关',
        tag: '西方式握拍',
        isTest: false
      },
      {
        rules: 'c',
        report: '伸肌肱肌腱炎相关',
        head: '存在风险',
        summary: '您的握拍姿势与运动损伤相关',
        tag: '半西方式握拍',
        isTest: false
      },
      {
        rules: 'd',
        report: '与各种运动损伤无明显相关，若曾出现blabla症状，建议尝试此种握拍姿势',
        head: '低风险',
        summary: '您的握拍姿势与运动损伤相关',
        tag: '大陆式握拍',
        isTest: false
      },
    ],
    answer3:[
      {
        rules: 'a',
        report: '大量研究表明，网球运动导致的肩痛的发生率在4%-17%之间。对于运动量较大的高水平网球爱好者，肩痛发生率可高达36%。反复击球使得肩关节和肌肉反复磨损，被认为是肩痛的主要成因。【3】肩损伤累积到一定程度可诱发炎症，出现不可缓解的肩痛。此时应当进行适当休息和护理，防止损伤加剧，发展成无法逆转的损伤。',
        head: '高风险',
        summary: '可能发生过运动损伤',
        tag: '肩受伤过',
        isTest: true
      },
      {
        rules: 'b',
        report: '大量研究表明，网球运动导致的肩痛的发生率在4%-17%之间。对于运动量较大的高水平网球爱好者，肩痛发生率可高达36%。反复击球使得肩关节和肌肉反复磨损，被认为是肩痛的主要成因。【3】肩损伤累积到一定程度可诱发炎症，出现不可缓解的肩痛。此时应当进行适当休息和护理，防止损伤加剧，发展成无法逆转的损伤。',
        head: '存在风险',
        summary: '可能有潜在的运动损伤',
        tag: '肩不舒服',
        isTest: true
      },
      {
        rules: 'c',
        report: '大量研究表明，网球运动导致的肩痛的发生率在4%-17%之间。对于运动量较大的高水平网球爱好者，肩痛发生率可高达36%。反复击球使得肩关节和肌肉反复磨损，被认为是肩痛的主要成因。【3】肩损伤累积到一定程度可诱发炎症，出现不可缓解的肩痛。此时应当进行适当休息和护理，防止损伤加剧，发展成无法逆转的损伤。',
        head: '低风险',
        summary: '不提示有过运动损伤',
        tag: '肩膀ok',
        isTest: false
      },
    ],
    result:[],
    isdown0:false,
    isdown1:true,
    isdown2:true,
    showTag:[],
    head:[],
    summary:[],
    text:[],
    isTest:[],
    answers:[],
    currentPage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let answers=[]
    let answer1=that.data.answer1
    let answer2=that.data.answer2
    let answer3=that.data.answer3
    let result=options.valuestr.split(",")
    let showTag=[]
    let head=[]
    let summary=[]
    let text=[]
    let isTest=[]
    for(let i=0;i<result.length;i++){
      let tagobj={}
      if(i==0){
        for(let j=0;j<answer1.length;j++){
          if(result[i]==answer1[j].rules){
            tagobj.tag = answer1[j].tag
            tagobj.id=i
            showTag.push(tagobj)
            head[i]=answer1[j].head
            summary[i]=answer1[j].summary
            text[i]=answer1[j].report
            isTest[i]=answer1[j].isTest
            break
          }
        }
      }
      if(i==1){
        for(let j=0;j<answer2.length;j++){
          if(result[i]==answer2[j].rules){
            tagobj.tag = answer2[j].tag
            tagobj.id = i
            showTag.push(tagobj)
            head[i]=answer2[j].head
            summary[i]=answer2[j].summary
            text[i] = answer2[j].report
            isTest[i] = answer2[j].isTest
            break
          }
        }
      }
      if (i == 2) {
        for (let j = 0; j < answer3.length; j++) {
          if (result[i] == answer3[j].rules) {
            tagobj.tag = answer3[j].tag
            tagobj.id = i
            showTag.push(tagobj)
            head[i]=answer3[j].head
            summary[i]=answer3[j].summary
            text[i] = answer3[j].report
            isTest[i] = answer3[j].isTest
            break
          }
        }
      }
    }

    let userInfo=wx.getStorageSync('listInfo')||[]
    if(userInfo){
      let tagobj={}
      let tagobj1={}
      if(userInfo.gender=='0'){
        tagobj.tag ='网球王子'
        tagobj.id =showTag.length
        showTag.push(tagobj)
      }
      else{
        tagobj.tag = '网球公主'
        tagobj.id = showTag.length
        showTag.push(tagobj)
      }
      if(userInfo.age<=30){
        tagobj1.tag = '青少年网球爱好者'
        tagobj1.id = showTag.length
        showTag.push(tagobj1)
      }
      else if(userInfo.age<=50){
        tagobj1.tag = '中年网球爱好者'
        tagobj1.id = showTag.length
        showTag.push(tagobj1)
      }
      else{
        tagobj1.tag = '老年网球爱好者'
        tagobj1.id = showTag.length
        showTag.push(tagobj1)
      }
    }
    for(let i=0;i<result.length;i++){
      let obj={}
      obj.head=head[i]
      obj.summary=summary[i]
      obj.text=text[i]
      obj.isTest=isTest[i]
      obj.id=i
      obj.isdown=true
      if(i==0){
        obj.title='网球运动分析与建议'
      }
      else if(i==1){
        obj.title='握拍姿势分析与建议'
      }
      else if(i==2){
        obj.title='运动损伤分析与建议'
      }
      answers.push(obj)
    }
    console.log(answers)
    console.log(showTag)
    that.setData({
      result: result,
      showTag:showTag,
      head:head,
      summary:summary,
      text:text,
      isTest:isTest,
      answers:answers,
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
  click:function(e){
    let that=this
    let answers=that.data.answers
    let currentPage=that.data.currentPage
    answers[currentPage].isdown=!answers[currentPage].isdown
    that.setData({
      answers:answers
    })
  },
  click0:function(e){
    let that=this
    let isdown=that.data.isdown0
    console.log(e)
    that.setData({
      isdown0:!isdown
    })
  },
  click1: function (e) {
    let that = this
    let isdown = that.data.isdown1
    that.setData({
      isdown1: !isdown
    })
  },
  click2: function (e) {
    let that = this
    let isdown = that.data.isdown2
    that.setData({
      isdown2: !isdown
    })
  },
  back:function(){
    wx.switchTab({
      url: '../../index/index',
    })
  },
  recheck:function(){
    wx.reLaunch({
      url: '../sportsChoose',
    })
  },
  toDisease:function(){
    wx.navigateTo({
      url: '../../disease/disease?id=17',
    })
  },
  swiperChange: function (e) {
    let that = this
    that.setData({
      currentPage: e.detail.current
    })
    console.log(that.data.currentPage)
  },
  clickTag:function(e){
    let that=this
    let maxLen=that.data.answers.length
    if (e.currentTarget.dataset.id<maxLen){
      that.setData({
        currentPage: e.currentTarget.dataset.id
      })
    }
    // let maxLen=that.data.answers.length-1
    // let id=e.currentTarget.dataset.id
    // console.log(id)
    // if(id<=maxLen){
    //   that.setData({
    //     currentPage:id
    //   })
    // }
  }
})