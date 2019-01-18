'use strict';

// get请求方法
function fetchGet(url, callback) {
   // return callback(null, top250)
   wx.request({
      url: url,
      header: { 'Content-Type': 'application/json' },
      success(res) {
         callback(null, res.data)
      },
      fail(e) {
         callback(e)
      }
   })
}

// post请求方法
function fetchPost(url, data, callback) {
   wx.request({
      method: 'POST',
      url: url,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: data,
      success(res) {
         callback(res.statusCode, res.data)
      },
      fail(e) {
         callback(e)
      }
   })
}

module.exports = {
   fetchGet: fetchGet,
   fetchPost: fetchPost
}
