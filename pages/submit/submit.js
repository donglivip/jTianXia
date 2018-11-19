// pages/submit/submit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city_default: app.globalData.city_default,
    imgurl: app.globalData.imgUrl,
    category_list:[],
  
  },
  opennew: function (event) {
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + '?name=' + event.currentTarget.dataset.name + '&category_id=' + event.currentTarget.dataset.category_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    //发布栏目
    wx.request({
      url: app.globalData.apiUrl + '/api/category/',
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          that.setData({
            category_list: res.data
          })
        }
        wx.setStorageSync('category_list', res.data)
      }
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