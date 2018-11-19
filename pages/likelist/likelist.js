// pages/likelist/likelist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgUrl,
    shangjia_lists:[]

  },
  opennew: function (event) {
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + ''
    })
  },
  opensj: function (event) {
    wx.setStorage({ key: 'sj_data', data: this.data.shangjia_lists[event.currentTarget.dataset.name] })
    //console.log(this.data.shangjia_lists[event.currentTarget.dataset.name])
    wx.setStorage({ key: 'my_data', data: event.currentTarget.dataset.name })
    //console.log(event)
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + '?name=' + event.currentTarget.dataset.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //shangjia_lists
    wx.request({
      url: app.globalData.apiUrl + '/api/shangjia/?page=0',
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.statusCode = 200) {
          console.log(res.data)
          that.setData({
            shangjia_lists: res.data
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