// pages/teamworkdetail/teamworkdetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgUrl,
    mydata:''
  },
  callman: function () {
    var that=this
    wx.makePhoneCall({
      phoneNumber: that.mtdaya.hezuo_phone //仅为示例，并非真实的电话号码
    })
  },
   convertHtmlToText: function (inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, ' * ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var city_default = wx.getStorageSync('city_default')
    var city_default_path = city_default['city_path'] + ',' + city_default['city_id']
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/api/hezuo/find',
      method: 'get',
      data: {
        type_id: wx.getStorageSync('categoryTd'),
        region_id: city_default_path
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          if(res.data==""){
            wx.showModal({
              title: '甲天下', content: '该分类下暂无合作商！', confirmText: '确定', showCancel: false, success: function () {
                wx.navigateBack()
              }
            })
          }
          res.data.hezuo_body = that.convertHtmlToText(res.data.hezuo_body)
          that.setData({
            mydata: res.data
          })
        }else{
          wx.showModal({
            title: '甲天下', content: '该分类下暂无合作商！', confirmText: '确定', showCancel:false, success:function(){
            wx.navigateBack()
          }})
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