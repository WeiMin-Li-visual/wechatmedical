Page({
  data: {
    "statusBarHeight":44,
    "toolbarHeight":44,
    userinfo:{}
  },

  onShow: function () {
    const userinfo=wx.getStorageSync('userinfo');
    this.setData({
      userinfo
    })
  },

})