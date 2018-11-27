var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city_default: app.globalData.city_default,
    imgurl: app.globalData.imgUrl,
    nav:[],
    banner:[],
    img_ad1:[],
    img_ad2:[],
    img_ad3:[],
    shangjia_lists:[],
    hezuo:[]
  },
  callman:function(){
    var that=this
    wx.makePhoneCall({
      phoneNumber: that.hezuo.hezuo_phone //仅为示例，并非真实的电话号码
    })
  },
  opennew:function(event){
    //console.log(event)
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + '?name=' + event.currentTarget.dataset.name
    })
  },
  opennav: function (event) {
    //console.log(event)
    var flid = event.currentTarget.dataset.flid
    if (event.currentTarget.dataset.name =='招聘/求职'){
      wx.navigateTo({
        url: '../list02/list02?name=' + event.currentTarget.dataset.name + '&flid=' + flid
      })
    }else{
      wx.navigateTo({
        url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + '?name=' + event.currentTarget.dataset.name + '&flid=' + flid
      })
    }
   
  },
  openimgad: function (event) {
    //wx.setStorage({ key: 'sj_data', data: this.data.shangjia_lists[event.currentTarget.dataset.name] })
    var ad_n = event.currentTarget.dataset.name
    if(ad_n == 1){
      var sj_data = this.data.img_ad1[0]
      //console.log(sj_data[0])
      wx.setStorage({ key: 'sj_data', data: sj_data })
    }
    if (ad_n == 2) {
      var sj_data = this.data.img_ad2[0]
      wx.setStorage({ key: 'sj_data', data: sj_data })
    }
    if (ad_n == 3) {
      var sj_data = this.data.img_ad3[0]
      wx.setStorage({ key: 'sj_data', data: sj_data })
    }
    //console.log(event)
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + '?name=' + event.currentTarget.dataset.name
    })
  },
  opensj: function (event) {
    wx.setStorage({ key: 'sj_data', data: this.data.shangjia_lists[event.currentTarget.dataset.name] })
    //console.log(this.data.shangjia_lists[event.currentTarget.dataset.name])
    //console.log(event)
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + '?name=' + event.currentTarget.dataset.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.userInfo)

    //默认城市
    var city_default = wx.getStorageSync('city_default')
    var city_default_path = city_default['city_path'] + ',' + city_default['city_id']
    //console.log(city_default['city_path'] + ','+city_default['city_id'])
    var that = this

    //nav
    wx.request({
      url: app.globalData.apiUrl + '/api/category/?page_num=9&nav=1',
      method:'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          that.setData({
            nav: res.data
          })
        }
      }
    })
    //banner
    wx.request({
      url: app.globalData.apiUrl + '/api/banner/?banner_type=1',
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          //console.log(res.data)
          that.setData({
            banner: res.data
          })
        }
      }
    })
    //img_ad1
    wx.request({
      url: app.globalData.apiUrl + '/api/shangjia/?sj_recommend=1&city=' + city_default_path,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          //console.log(res.data)
          that.setData({
            img_ad1: res.data
          })
        }
      }
    })
    //img_ad2
    wx.request({
      url: app.globalData.apiUrl + '/api/shangjia/?sj_recommend=2&city=' + city_default_path,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          //console.log(res.data)
          that.setData({
            img_ad2: res.data
          })
        }
      }
    })
    //img_ad3
    wx.request({
      url: app.globalData.apiUrl + '/api/shangjia/?sj_recommend=3&city=' + city_default_path,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          //console.log(res.data)
          that.setData({
            img_ad3: res.data
          })
        }
      }
    })
    //shangjia_lists
    wx.request({
      url: app.globalData.apiUrl + '/api/shangjia/?page=0&city=' + city_default_path,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          //console.log(res.data)
          that.setData({
            shangjia_lists: res.data
          })
        }
      }
    })
    //hezuo
    wx.request({
      url: app.globalData.apiUrl + '/api/hezuo/findone/?region_id=' + city_default_path,
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode = 200) {
          //console.log(res.data)
          that.setData({
            hezuo: res.data
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
    var city_default = wx.getStorageSync('city_default')
    this.setData({
      city_default: city_default
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