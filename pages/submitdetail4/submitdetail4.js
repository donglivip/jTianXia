// directory.js
var app = getApp()
var address = require('../../utils/city.js')
var animation
Page({

  /**
   * 页面的初始数据
   * 当前    provinces:所有省份
   * citys选择省对应的所有市,
   * areas选择市对应的所有区
   * provinces：当前被选中的省
   * city当前被选中的市
   * areas当前被选中的区
   */
  data: {
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    dates: '',
    array: ['待租', '忙碌', '空闲'],
    index: '',
    radio: true,
    citydata: [],
    submitdata: {},
    category_id: 0,//从列表页传过来的栏目ID参数
    upload_img_path1: [],
    upload_img_path2:"",
    areaID: '',
  },
  changeimg: function () {
    var that = this
    wx.chooseImage({
      count: 8, //默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        //console.log(tempFilePaths[0])
        var new_img_path = that.data.upload_img_path1
        var new_img_path2 = that.data.upload_img_path2
        var img_count = new_img_path.length
        //console.log(img_count)
        if (img_count + 1 > 9) {
          wx.showToast({
            title: '最大4张',
            icon: 'loading',//图标，支持"success"、"loading"
            mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
            success: function () {
              //console.log(that.data.upload_img_path1)
            },
            fail: function () { },//接口调用失败的回调函数
            complete: function () {}//接口调用结束的回调函数
          })
        } else {
          new_img_path.push(tempFilePaths[0])
          that.setData({
            upload_img_path1: new_img_path
          })
          wx.uploadFile({
            url: app.globalData.apiUrl + '/api/fbapi/upload',
            filePath: tempFilePaths[0],
            name: 'file',
            //header: 'Content-Type:multipart/form-data',
            formData: {
            },
            success(res2) {
              var msg_s = res2.data
              var msg = JSON.parse(msg_s)
              that.setData({
                upload_img_path2: that.data.upload_img_path2 + '"' + msg['data'] + '",'
              })

              wx.showToast({
                title: msg['info'],
                icon: 'loading',//图标，支持"success"、"loading"
                mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
                success: function () {
                  //console.log(that.data.upload_img_path1)
                },
                fail: function () {},//接口调用失败的回调函数
                complete: function () {}//接口调用结束的回调函数
              })
            }
          })
        }
      }
    })
  },
  radiochange: function () {
    this.setData({
      radio: !this.data.radio
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log(e)
    this.setData({
      dates: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.data.category_id = options.category_id
    var that = this
    //城市
    wx.request({
      url: app.globalData.apiUrl + '/api/city',
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode = 200) {
          that.setData({
            citydata: res.data,
            provinces: res.data,
            citys: res.data[0]['citydata'],
            areas: res.data[0]['citydata'][0]['citydata']
          })
          console.log(res.data)
          //that.address.provinces = res.data
        }
      }
    })
    // 自定义页面名称
    wx.setNavigationBarTitle({
      title: options.name
    })
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
    console.log(this.data)
  },
  // 显示
  showMenuTap: function (e) {
    console.log('selectState')
    //获取点击菜单的类型 1点击状态 2点击时间 
    var menuType = e.currentTarget.dataset.type
    // 如果当前已经显示，再次点击时隐藏
    if (this.data.isVisible == true) {
      this.startAnimation(false, -200)
      return
    }
    this.setData({
      menuType: menuType
    })
    this.startAnimation(true, 0)
  },
  hideMenuTap: function (e) {
    this.startAnimation(false, -200)
  },
  // 执行动画
  startAnimation: function (isShow, offset) {
    var that = this
    var offsetTem
    if (offset == 0) {
      offsetTem = offset
    } else {
      offsetTem = offset + 'rpx'
    }
    this.animation.translateY(offset).step()
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    })
    console.log(that.data)
  },
  // 选择状态按钮
  selectState: function (e) {
    console.log('selectState1')
    this.startAnimation(false, -200)
    var status = e.currentTarget.dataset.status
    this.setData({
      status: status
    })
    console.log(this.data)

  },
  sureDateTap: function () {
    this.data.pageNo = 1
    this.startAnimation(false, -200)
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

  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    console.log('111111111')
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var value = this.data.value
    //console.log(value)
    var that = this
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo
    var areaID
    if (that.data.citys[value[1]].id != undefined) {
      areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
      areaID = that.data.provinces[value[0]].id + ',' + that.data.citys[value[1]].id + ',' + that.data.areas[value[2]].id
    } else {
      areaInfo = that.data.provinces[value[0]].name
      areaID = that.data.provinces[value[0]].id
    }
    that.setData({
      areaInfo: areaInfo,
      areaID: areaID
    })

  },
  hideCitySelected: function (e) {
    console.log(e)
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {

    var value = e.detail.value

    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    var provinces = this.data.provinces[value[0]]
    var citys = provinces['citydata']
    if (citys == '') {
      citys = [{ "citydata": [] }]
    }
    var areas = citys[cityNum]['citydata']
    if (areas == '') {
      areas = [{ "citydata": [] }]
    }
    this.setData({
      value: value,
      citys: citys,
      areas: areas,
    })

  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var tj_data = e.detail.value
    var fbc4_state
    if (typeof (tj_data['fbc4_state']) == "string") {
      fbc4_state = 1
    }
    var zt = tj_data['fbc4_state']
    //console.log(zt)

    if (zt == '待租') {
      fbc4_state = 1
    }
    if (zt == '忙碌') {
      fbc4_state = 2
    }
    if (zt == '空闲') {
      fbc4_state = 3
    }
    if (this.data.radio) {
      var user_id = app.globalData.user_id
      var fb_region = this.data.areaID
      console.log(fb_region)
      if (typeof (fb_region) == "undefined") {
        fb_region = 0
      }

      var fb_category_id = this.data.category_id
      tj_data['fb_category_id'] = fb_category_id
      tj_data['user_id'] = user_id
      tj_data['fb_region'] = fb_region
      tj_data['fbc4_state'] = fbc4_state
      var slide = "[" + this.data.upload_img_path2 + "]"
      if (slide == '[]') {
        slide = ""
      }
      tj_data['fb_slide'] = slide

      console.log(tj_data)
      var that = this
      wx.request({
        url: app.globalData.apiUrl + '/api/fbapi/add_tuoche',
        method: 'post',
        data: tj_data,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode = 200) {
            console.log(res.data)
            if (res.data.status == 'ok') {
              wx.showToast({
                title: res.data.info,
                icon: 'loading',//图标，支持"success"、"loading"
                duration: 3000,
                mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
                success: function () {
                  wx.switchTab({
                    url: '/pages/index/index'
                  })
                },
                fail: function () { },//接口调用失败的回调函数
                complete: function () { }//接口调用结束的回调函数
              })
            } else {
              wx.showToast({
                title: '错误',
                icon: 'loading',//图标，支持"success"、"loading"
                mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
                success: function () { },
                fail: function () { },//接口调用失败的回调函数
                complete: function () { }//接口调用结束的回调函数
              })
            }
          }
        }
      })


    } else {
     // console.log(tj_data)
    }

  }

})