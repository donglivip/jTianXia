// pages/teamwork/teamwork.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_list:[],
    imgurl: app.globalData.imgUrl
  },
  opennew: function (event) {
    console.log(event.currentTarget.dataset.categorytd)
    wx.setStorageSync('categoryTd', event.currentTarget.dataset.categorytd)
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var city = app.globalData.city_default;
    var that = this;
   
    wx.request({
      url: app.globalData.apiUrl + '/api/hezuo/list?region_id=' + city,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(city)
        console.log(res)
        if (res.statusCode = 200) {
          that.setData({
            all_list: res.data
          })
        }
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