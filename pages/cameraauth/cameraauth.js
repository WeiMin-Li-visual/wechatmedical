Page({
  data: {
    hasUserInfo: false,
  },

  getCameraSetting () {
    const that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 用户已经授权
          that.setData({
            hasUserInfo: true
          });
          wx.navigateBack({
            delta: 1,
          });
        } else {
          // 用户还没有授权，向用户发起授权请求
          wx.authorize({
            scope: 'scope.camera',
            success() { // 用户同意授权
              that.setData({
                hasUserInfo: true
              });
              wx.navigateBack({
                delta: 1,
              });
            },
            fail() { // 用户不同意授权
              that.setData({
                hasUserInfo: false
              })
              wx.navigateBack({
                delta: 1,
              });
              wx.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 3000
              })
            }
          })
        }
      },
      fail: res => {
        console.log('获取用户授权信息失败')
        wx.showToast({
          title: '获取用户授权信息失败',
          icon: 'none',
          duration: 3000
        })
        that.setData({
          hasUserInfo: false
        })
        wx.navigateBack({
          delta: 1,
        });
      }
    })
  },

})