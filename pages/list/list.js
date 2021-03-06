// pages/list/list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    city_default: app.globalData.city_default,
    imgurl: app.globalData.imgUrl,
    xinxi_lists: [],
    fb_id: 0,
    category: [],
    fbc_status: [{ "1": ['急售', '待售'], "2": ['待租', '忙碌', "空闲"], "3": ["工程项目", "招聘", "求职"], "4": ["待租", "忙碌", "空闲"], "100": ['空'] }]
  },
  opennew: function (event) {
    var fb_id = event.currentTarget.dataset.fbid
    var title = event.currentTarget.dataset.title
    var model = event.currentTarget.dataset.model
    var view_page = 'shopdetail'
    switch (model) {
      case '1':
        view_page = 'shopdetail1'
        break;
      case '2':
        view_page = 'shopdetail2'
        break;
      case '3':
        view_page = 'shopdetail3'
        break;
      case '4':
        view_page = 'shopdetail4'
        break;
      case '5':
        view_page = 'shopdetail'
        break;
      case '6':
        view_page = 'shopdetail'
        break;
      case '7':
        view_page = 'shopdetail'
        break;
      case '8':
        view_page = 'shopdetail'
        break;
      case '9':
        view_page = 'shopdetail'
        break;
      default:
        view_page = 'shopdetail'
    }
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + view_page + '?fb_id=' + fb_id + '&title=' + title
    })
  },
  opennew2: function (event) {
    var fb_id = event.currentTarget.dataset.fbid
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.id + '/' + event.currentTarget.dataset.id + '?fb_id=' + fb_id
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
      success: function (res) {//{{fbc_status[category_info_model][]}}
        if (res.statusCode = 200) {
          console.log(res.data)
          var xx_list = res.data
          // xx_list.forEach(function (item, index) {
          //   var model = res.data.category.category_info_model
          //   switch (model) {
          //     case '1':
          //       c_status = item.fbc1_status - 1
          //       c_price_dw = '万元'
          //       break;
          //     case '2':
          //       c_status = item.fbc2_state - 1 || 0
          //       c_price_dw = '元/小时'
          //       break;
          //     case '4':
          //       c_status = item.fbc4_state - 1
          //       c_price_dw = '元/公里'
          //       break;
          //     default:
          //       model = '100'
          //       c_status = 0
          //       c_price_dw = ''
          //   }

          //   //var c_status = item.fbc1_status || item.fbc2_status || item.fbc4_status||101
          //   var fbc_status_text = that.data.fbc_status[0][model][c_status]
          //   xx_list[index]['fbc_status_text'] = fbc_status_text
          //   xx_list[index]['c_price_dw'] = c_price_dw
          //   console.log(xx_list)
          // })
          that.setData({
            xinxi_lists: xx_list,
            category: res.data.category
          })
          //console.log(res.data)
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