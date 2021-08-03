Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile(e) {
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