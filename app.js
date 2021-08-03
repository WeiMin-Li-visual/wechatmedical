App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
      }
    })
  },

  globalData: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    tonguimagelist: [], // 保存拍摄的舌头图片，2张
    tongucount: 0,
    tongumHidden:false,
    palmimagelist: [], // 保存拍摄的手掌图片，2张
    palmcount: 0,
    palmmHidden:false,
    faceimagelist: [], // 保存拍摄的脸部图片，3张
    facecount: 0,
    palmmHidden:false,
  },
})