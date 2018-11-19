// pages/helpdetail/helpdetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    may_data:[],
    may_hf_lists:[],
    mayBody:''
  },
  submit:function(){
    var that=this
    wx.request({
      url: app.globalData.apiUrl + '/api/mayday/add_huifu',
      method: 'post',
      data: {
        user_id: wx.getStorageSync('userid'),
        may_body: that.data.mayBody,
        target_id: wx.getStorageSync('targetId')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode==200){
            wx.showToast({
              title: '回复成功！',
            })
          that.myajax()
        }else{
          wx.showToast({
            title: '回复失败！',
          })
        }
      }
    })
  },
  inputblur:function(e){
    var val = e.detail.value;
    this.setData({
      mayBody: val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  myajax:function(){
    this.setData({
      may_data: wx.getStorageSync('may_data')
    })
    //console.log(this.data.may_data.may_id)
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/api/mayday/hf_list/?may_id=' + this.data.may_data.may_id,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.statusCode = 200) {
          that.setData({
            may_hf_lists: res.data
          })
        }
      }
    })
  },
  onLoad: function (options) {
   this.myajax()
    //console.log(this.data.may_data)
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