// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  //用户登陆
  userLogin: function () {
    wx.checkSession({
      success: function () {
        //存在登陆态
      },
      fail: function () {
        //不存在登陆态
        onLogin()
      }
    })
  },

  onLogin: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'Our Server ApiUrl',
            data: {
              code: res.code
            },
            success: function (res) {
              const self = this
              if (逻辑成功) {
                //获取到用户凭证 存儲 3rd_session 
                var json = JSON.parse(res.data.Data)
                wx.setStorage({
                  key: "third_Session",
                  data: json.third_Session
                })
                getUserInfo()
              } else {

              }
            },
            fail: function (res) {

            }
          })
        }
      },
      fail: function (res) {

      }
    })

  },

  getUserInfo: function () {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        userInfoSetInSQL(userInfo)
      },
      fail: function () {
        userAccess()
      }
    })
  },

  userInfoSetInSQL: function (userInfo) {
    wx.getStorage({
      key: 'third_Session',
      success: function (res) {
        wx.request({
          url: 'Our Server ApiUrl',
          data: {
            third_Session: res.data,
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            province: userInfo.province,
            city: userInfo.city,
            country: userInfo.country
          },
          success: function (res) {
            if (逻辑成功) {
              //SQL更新用户数据成功
            } else {
              //SQL更新用户数据失败
            }
          }
        })
      }
    })
  }
})