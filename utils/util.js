//util.js  
function imageUtil(e) {  
  var imageSize = {};  
  var originalWidth = e.detail.width;//图片原始宽  
  var originalHeight = e.detail.height;//图片原始高  
  var originalScale = originalHeight/originalWidth;//图片高宽比  
  console.log('originalWidth: ' + originalWidth)  
  console.log('originalHeight: ' + originalHeight)  
  //获取屏幕宽高  
  wx.getSystemInfo({  
    success: function (res) {  
      var windowWidth = res.windowWidth;  
      var windowHeight = res.windowHeight;  
      var windowscale = windowHeight/windowWidth;//屏幕高宽比  
      console.log('windowWidth: ' + windowWidth)  
      console.log('windowHeight: ' + windowHeight)  
      if(originalScale < windowscale){//图片高宽比小于屏幕高宽比  
        //图片缩放后的宽为屏幕宽  
         imageSize.imageWidth = windowWidth;  
         imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;  
      }else{//图片高宽比大于屏幕高宽比  
        //图片缩放后的高为屏幕高  
         imageSize.imageHeight = windowHeight;  
         imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;  
      }  
       
    }  
  })  
  console.log('缩放后的宽: ' + imageSize.imageWidth)  
  console.log('缩放后的高: ' + imageSize.imageHeight)  
  return imageSize;  
}  

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//邮箱以及手机的正则表达式
function regexConfig() {
  var reg = {
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone: /^1(3|4|5|7|8)\d{9}$/
  }
  return reg;
}


function getDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate();
  if (m < 10) m = '0' + m;
  if (d < 10) d = '0' + d;
  return y + "-" + m + "-" + d;
}

function getDateDiff(day1, day2) {
  var sArr = day1.split("-");
  var eArr = day2.split("-");
  var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
  var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
  if (eRDate < sRDate) return -1;
  var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
  return result;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}
function json2Form_2(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(json[p]));
  }
  return str.join("&&");
}
function isEmptyObject(obj) {
  var typename = typeof (obj)
  if (typename == 'object') {
    if (obj == null) return true;
    else {
      for (var name in obj) {
        return false;
      }
      return true;
    }

  } else {
    if (obj) return false;
    else return true;
  }
};

function hasProp(str, obj) {
  for (var name in obj) {
    if (name === str) return true;
  }
  return false;
};

module.exports = {  
  imageUtil: imageUtil,
  formatTime: formatTime,
  regexConfig: regexConfig,
  getDateStr: getDateStr,
  getDateDiff: getDateDiff,
  json2Form: json2Form,
  json2Form_2: json2Form_2,
  isEmptyObject: isEmptyObject,
  hasProp: hasProp
} 


