// pages/list/list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    city_default: app.globalData.city_default,
    imgurl: app.globalData.imgUrl,
    xinxi_lists:[],
    fb_id:0

  },
  opennew: function (event) {
    var fb_id = event.currentTarget.dataset.fbid
    var title = event.currentTarget.dataset.title
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + '?fb_id=' + fb_id + '&title=' + title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })

    this.setData({
      title: options.name
    })

    wx.setStorageSync('options', options)

    //console.log(options.flid)
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
    var options = wx.getStorageSync('options')
    //console.log(options)

    var that = this

    //信息列表
    var fl_id = options.flid
    var region = wx.getStorageSync('city_default')
    var cp = region['city_path']
    if (cp == '0') {
      var region2 = region['city_id']
    } else {
      var cp2 = cp.substring(2)
      var region2 = cp2 + ',' + region['city_id']
    }

    var typeId = 2;

    wx.request({
      url: app.globalData.apiUrl + '/api/fbapi/send_list/?region=' + region2 + '&fb_category_id=' + fl_id + '&typeId=' + typeId,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          //console.log(res.data)
          that.setData({
            xinxi_lists: res.data
          })
        }
      }
    })

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