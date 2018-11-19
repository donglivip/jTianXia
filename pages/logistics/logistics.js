// pages/logistics/logistics.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      mydata:[ ],
      wlwddata:[]
  },
  // 详情显示切换
  showboo:function(event){
      this.setData({
        [`mydata[${event.currentTarget.dataset.index}].showdetail`]: !this.data.mydata[event.currentTarget.dataset.index].showdetail
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/api/wlwd/',
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.statusCode = 200) {
          var wlwd = res.data
          wlwd.forEach(function (item, index) {
            wlwd[index].name = item.wl_name
            wlwd[index].showdetail = false
            wlwd[index].text = item.body_text_list
            wlwd[index].shopdata = [{ "title": "内容", "text": item.body_text_list}]
          })
        }
        that.setData({
          mydata: wlwd
        })
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