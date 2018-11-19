// pages/adress/adress.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      city_user:app.globalData.city_user,
      city_id1:0,
      city_id2:0,
      city_id3:0,
      oneindex:0,
      twoindex:0,
      threeindex:0,
      citydata:[
        {
          name:'江苏省',
          citydata:[
            {
              name:'徐州市',
              citydata:[
                '鼓楼区',
                '贾汪区',
                '云龙区',
                '铜山区'
              ]
            },
            {
              name: '徐州市',
              citydata: [
                '白云区',
                '江宁区',
                '黄河区',
                '其他区'
              ]
            }
          ]
        }, {
          name: '山东省',
          citydata: [
            {
              name: '济南市',
              citydata: [
                '历下区',
                '市中区',
                '天桥区',
                '历城区'
              ]
            },
            {
              name: '青岛市',
              citydata: [
                '市辖区',
                '市南区',
                '市北区',
                '黄岛区'
              ]
            }
          ]
        }
      ]
  },
  onechange: function (event){
    //var city_user = this.data.city_user + ',' + event.currentTarget.dataset.cityid
    //console.log(city_user)
    var city_id1 = event.currentTarget.dataset.cityid
    this.setData({
      oneindex: event.currentTarget.dataset.index,
      city_id1: city_id1
    })
    
    var city_default = this.data.citydata[city_id1]
    wx.setStorageSync('city_default', city_default)
    wx.getStorageSync('city_defaul', event.currentTarget.dataset.ctiypath)
    wx.getStorageSync('city_defaul_path', event.currentTarget.dataset.ctiypath)
  },
  twochange: function (event) {
    var city_id2 = event.currentTarget.dataset.cityid
    this.setData({
      twoindex: event.currentTarget.dataset.index,
      city_id2: city_id2
    })
    var city_id1 = this.data.city_id1
    var city_default = this.data.citydata[city_id1].citydata[city_id2]
    wx.setStorageSync('city_default', city_default)
    wx.getStorageSync('city_defaul_path', event.currentTarget.dataset.ctiypath)
  },
  threechange: function (event) {
    var city_id3 = event.currentTarget.dataset.cityid
    this.setData({
      threeindex: event.currentTarget.dataset.index,
      city_id3: city_id3
    })
    var city_id1 = this.data.city_id1
    var city_id2 = this.data.city_id2
    var city_default = this.data.citydata[city_id1].citydata[city_id2].citydata[city_id3]
    wx.setStorageSync('city_default', city_default)
    wx.getStorageSync('city_defaul_path', event.currentTarget.dataset.ctiypath)
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

    wx.request({
      url: app.globalData.apiUrl + '/api/city/?city_arr_id=1',
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          that.setData({
            citydata: res.data
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