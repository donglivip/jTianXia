//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res.code)
        var that = this
        wx.request({
          url: this.globalData.apiUrl + '/api/user/wxlogin/?code='+res.code,
          method: 'get',
          data: {}, 
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.statusCode = 200) {
              console.log(res.data)
              that.globalData.user_openid = res.data['user_openid']
              that.globalData.user_id = res.data['user_id']
              wx.setStorageSync('openid', res.data['user_openid'])
              wx.setStorageSync('userid', res.data['user_id'])
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //默认城市
    wx.request({
      url: this.globalData.apiUrl + '/api/city/?city_type=1',
      method: 'get',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        /*that.globalData.city_default = [res.data.city_id,res.data.city_name]
        //console.log(that.globalData.city_default)
        this.city_id = res.data.city_id
        that.city_name = res.data.city_name
        that.cc(that.globalData.city_default)
        this.globalData.city_default = [1,'w']*/
        wx.setStorageSync('city_default', res.data)
      }
    })
    //console.log(wx.getStorageSync('city_default'))
    this.globalData.city_default = wx.getStorageSync('city_default')
  },
  globalData: {
    userInfo: null,
    apiUrl:'https://tianxia.u581.com/index.php',
    imgUrl:'https://tianxia.u581.com',
    city_default:null,
    city_user:'0',
    'user_openid':null,
    'user_id':null
  }
})