//获取应用实例
var app = getApp();

Page({
  data: {
    devicePosition: 'back', // 相机前后置
    authCamera: false, //用户是否运行授权拍照  
    flash: false, // 闪光灯，默认关闭
    upload_status: "",
    upload_hidden: true,
  },

  // 页面弹窗关闭
  closeModel: function () {
    var that = this
    that.setData({
      mHidden: true
    });
  },

  // 页面弹窗确定
  confirmModel: function () {
    var that = this
    that.setData({
      mHidden: true
    });
  },

  // 用户拒绝使用相机时触发的事件
  handleCameraError: function () {
    authCamera: false;
    wx.showToast({
      title: '用户拒绝使用摄像头',
      icon: 'none'
    })
  },

  // 翻转相机前后置
  reverseCamera: function () {
    this.setData({
      devicePosition: "back" === this.data.devicePosition ? "front" : "back",
      mHidden: true
    });
  },

  //拍摄照片  
  takePhoto: function () {
    var that = this;
    wx.createCameraContext().takePhoto({
      quality: 'high', //拍摄质量(high:高质量 normal:普通质量 low:高质量)  
      success: (res) => {
        // 拍摄成功，显示正在上传，禁用相机
        that.setData({
          upload_hidden: true,
          mHidden: true
        })

        //上传图片到服务器  
        var pic = res.tempImagePath;
        wx.uploadFile({
          url: 'http://127.0.0.1:5000/palm/uploadimage',
          filePath: String(pic),
          name: 'image',
          success: function (e) {
            app.globalData.palmimagelist = that.data.palmimagelist.concat(pic) // 保存图片
            if (that.data.count == 0) {
              app.globalData.palmcount = 1
              var report = JSON.parse(e.data)
              app.globalData.palmfeature[0] = that.data.palmfeature[0].concat(report["palm_color"])
              wx.navigateTo({
                url: '/pages/palm/palm',
              })
            }
            // 分析结果并跳转到结果界面
            else if (that.data.count == 1) {
              var report = JSON.parse(e.data)
              app.globalData.palmfeature[0] = that.data.palmfeature[0].concat(report["palm_color"])
              app.globalData.palmcount = 0
              wx.navigateTo({
                url: '/pages/palmreport/palmreport', // 这里跳转到结果界面
              })
            }
            that.setData({
              upload_hidden: false,
              mHidden: true
            })
            app.globalData.palmmHidden = true
          },
          fail: function (t) {
            that.setData({
              //上传失败  
              upload_status: "上传失败",
              mHidden: true
            })
            app.globalData.palmmHidden = true
            app.globalData.palmcount = 0
          },
        })
      },
      fail: (res) => {
        that.setData({
          //拍摄失败  
          upload_status: "拍照失败，请重新拍摄",
          mHidden: true

        })
        app.globalData.palmmHidden = true
        app.globalData.palmcount = 0
      },
    })
  },

  // 相册选择图片
  chooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多选择多少张
      sizeType: ['original', 'compressed'], // 大小，是否原图
      // sourceType: ['album', 'camera'], //相册或相机获取
      sourceType: ['album'],
      success: function (res) {
        // 照片选择成功
        that.setData({
          upload_hidden: true,
          mHidden: true
        })

        //上传图片到服务器  
        var pic = res.tempFilePaths[0];
        console.log(pic)
        wx.uploadFile({
          url: 'http://127.0.0.1:5000/palm/uploadimage',
          filePath: String(pic),
          name: 'image',
          success: function (e) {
            app.globalData.palmimagelist = that.data.palmimagelist.concat(pic) // 保存图片
            if (that.data.count == 0) {
              app.globalData.palmcount = 1
              var report = JSON.parse(e.data)
              app.globalData.palmfeature[0] = that.data.palmfeature[0].concat(report["palm_color"])
              wx.navigateTo({
                url: '/pages/palm/palm',
              })
            }
            // 分析结果并跳转到结果界面
            else if (that.data.count == 1) {
              var report = JSON.parse(e.data)
              app.globalData.palmfeature[0] = that.data.palmfeature[0].concat(report["palm_color"])
              app.globalData.palmcount = 0
              wx.navigateTo({
                url: '/pages/palmreport/palmreport', // 这里跳转到结果界面
              })
            }

            that.setData({
              mHidden: true,
              upload_hidden: false
            })

            app.globalData.palmmHidden = true
          },
          fail: function (t) {
            that.setData({
              //上传失败  
              upload_status: "上传失败",
              mHidden: true
            })

            app.globalData.palmmHidden = true
            app.globalData.palmcount = 0
          },
        })
      },
      fail: (res) => {
        that.setData({
          //拍摄失败  
          upload_status: "拍照失败，请重新拍摄",
          mHidden: true
        })
        app.globalData.palmmHidden = true
        app.globalData.palmcount = 0
      },
    })
  },

  // 获取用户相机授权
  getCameraSetting() {
    const _this = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 用户已经授权
          _this.setData({
            // isAuth: true,
            isNeedSettingButton: false
          })
          wx.navigateBack({
            delta: 1,
          });
        } else {
          // 用户还没有授权，向用户发起授权请求
          wx.authorize({
            scope: 'scope.camera',
            success() { // 用户同意授权
              _this.setData({
                // isAuth: true,
                isNeedSettingButton: false
              })
              wx.navigateBack({
                delta: 0,
              });
            },
            fail() { // 用户不同意授权
              _this.setData({
                isNeedSettingButton: true
              })
              wx.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 3000
              })
              wx.navigateBack({
                delta: 0,
              });
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
        _this.setData({
          isNeedSettingButton: true
        })
        wx.navigateBack({
          delta: 0,
        });
      }
    })
  },

  onShow: function () {
    this.setData({
      palmimagelist: app.globalData.palmimagelist, // 保存用户拍的两张照片
      count: app.globalData.palmcount,
      mHidden: app.globalData.palmmHidden, // 拍照提示是否隐藏
      palmfeature: app.globalData.palmfeature
    })
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.camera"]) {

          this.setData({
            authCamera: true,
          })
        } else {

          this.setData({
            authCamera: false,
          })
        }
      }
    });
  },
})