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
    imagelist: [], 
    imagecount: 0,
    mHidden:false,

    // 记录特征
    tonguefeature:[[],[],[],[],[],[]],
    palmfeature:[[]],  // 只有掌色
    facefeature:[[]],  // 只有面色
  },
})