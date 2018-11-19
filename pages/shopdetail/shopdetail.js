// pages/shopdetail/shopdetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city_default: app.globalData.city_default,
    imgurl: app.globalData.imgUrl,
      shopdata:{
        shopname:'测试标题测试标题',
        text:'XXXXX店',
        adress:'XXXX县XXXX市XXXX区',
        user:'XXX',
        phone:'2354561515456',
        detail:'详情信息详情信息详情信息详情信息详情信息详情信息详情信息详情信息详情信息详情信息详情信息详情信息详情信息',
        good:0
      }
  },
  openphone: function (event) {
    var fb_id = event.currentTarget.dataset.fbid
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone
    })
  },
  callman: function () {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })

    var fb_id = options.fb_id
    var that = this

    //信息内容
    wx.request({
      url: app.globalData.apiUrl + '/api/fbapi/getInfor/?fb_id=' + fb_id,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.statusCode = 200) {
          console.log(res.data)
          that.setData({
            shopdata: res.data
          })
        }
        console.log(res.data)
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