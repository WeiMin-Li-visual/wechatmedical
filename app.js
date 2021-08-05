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
    tongueimagelist: [], // 保存拍摄的舌头图片，2张
    tonguecount: 0,
    tonguemHidden:false,
    tonguefeature:[[],[],[],[],[],[]],
    palmimagelist: [], // 保存拍摄的手掌图片，2张
    palmcount: 0,
    palmmHidden:false,
    palmfeature:[[0,0]],  // 只有掌色
    faceimagelist: [], // 保存拍摄的脸部图片，3张
    facecount: 0,
    facemHidden:false,
    facefeature:[[0,0]],  // 只有面色
  },
})