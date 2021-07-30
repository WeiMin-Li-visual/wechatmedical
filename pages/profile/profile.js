// pages/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight":44,
    "toolbarHeight":44,
    "userInfo":{}
  },
  goWhere(e){
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: '../../packageA/pages/'+data.url+'/'+data.url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.systemInfo.safeArea)
    this.setData({
      userInfo:app.globalData.userInfo,
    })
    if (app.globalData.systemInfo.platform === 'android') {
      // android 需要执行的代码
      this.setData({
        toolbarHeight:48
      })
    } else {
      // ios 需要执行的代码
      this.setData({
        toolbarHeight:44
      })
    }
    this.setData({
      statusBarHeight:app.globalData.systemInfo.statusBarHeight
    })    
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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

  }
})