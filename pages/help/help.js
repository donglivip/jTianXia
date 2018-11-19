// pages/help/help.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    may_lists:[]
  },
  opennew: function (event) {
    if (event.currentTarget.dataset.id =='helpdetail'){
      var may_index = event.currentTarget.dataset.may_index
      var may_lists = this.data.may_lists
      //console.log()
      wx.setStorage({ key: 'may_data', data: may_lists[may_index] })
      wx.setStorageSync('targetId', may_lists[may_index].may_id)
    }
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/api/mayday/?page=0',
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.statusCode = 200) {
          that.setData({
            may_lists: res.data
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