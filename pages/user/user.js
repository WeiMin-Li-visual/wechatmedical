var app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },

  onLoad() {
    if (wx.getStorageSync('userinfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userinfo'),
        hasUserInfo: true,
      })
    }
  },

  onShareAppMessage(result) {
    // 转发
    return {
      title: '慧诊',
      desc: '助力中医发展',
      imageUrl: "/static/image/logo.jpg",
      path: '/page/index/index'
    }
  },

  // 用户登录
  login(e) {
    if (!wx.getStorageSync('userinfo')) {
      wx.getUserProfile({
        desc: '健康管理',
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          wx.setStorageSync('userinfo', res.userInfo);
          wx.navigateBack({
            delta: 1,
          });
        }
      });
    }
  },
})