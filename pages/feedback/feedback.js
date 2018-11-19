// pages/feedback/feedback.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  formSubmit: function (e) {
    var tj_data = e.detail.value
    var user_id = app.globalData.user_id
    tj_data['user_id'] = user_id

    wx.request({
      url: app.globalData.apiUrl + '/api/fk/add_fankui',
      method: 'post',
      data: tj_data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          console.log(res.data)
          if (res.data.status == 'ok') {
            wx.showToast({
              title: res.data.info,
              icon: 'loading',//图标，支持"success"、"loading"
              duration: 3000,
              mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
              success: function () {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              },
              fail: function () { },//接口调用失败的回调函数
              complete: function () { }//接口调用结束的回调函数
            })
          } else {
            wx.showToast({
              title: '错误',
              icon: 'loading',//图标，支持"success"、"loading"
              mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
              success: function () { },
              fail: function () { },//接口调用失败的回调函数
              complete: function () { }//接口调用结束的回调函数
            })
          }
        }
      }
    })
  }
})