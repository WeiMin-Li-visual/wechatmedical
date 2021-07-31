App({
  onLaunch:function(){
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
},


  onShow:function(){
    console.log('App Show')
  },
  onHide:function(){
    console.log('App Hide')
  }
})