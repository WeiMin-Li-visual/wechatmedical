//获取应用实例
var app = getApp();

Page({
  data: {
    devicePosition: 'front', // 相机前后置
    authCamera: false, //用户是否运行授权拍照  
    flash: false, // 闪光灯，默认关闭
    upload_status: true, // 上传状态
    imagelist: [], //记录上传照片
    upload_dic: "", // 上传状态对应的描述
    uploadHidden: true, // 上传过程的加载界面
    imagecount: 0, // 记录已经上传了几张照片，0表示当前开始上传舌面照片，1表示当前上传舌背照片
    mHidden: 0, // 拍照提示是否隐藏
    uploadHidden: true, //正在上传提示
    feature: [],
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

  failfun: function () {
    app.globalData.mHidden = this.data.mHidden;
    app.globalData.imagecount = this.data.imagecount;
    wx.navigateTo({
      url: '/pages/tongue/tongue',
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
          uploadHidden: false,
        })

        // wx.showLoading({
        //   title: '上传中',
        // })

        //上传图片到服务器  
        var pic = res.tempImagePath;
        wx.uploadFile({
          // 本地地址
          url: 'http://127.0.0.1:5000/tongue/uploadimage',  

          // 实验室服务器地址
          // url: 'https://www.lib61504.top:9200/tongue/uploadimage',
          // url: 'http://118.31.76.165:9200/tongue/uploadimage',

          filePath: String(pic),
          name: 'image',
          success: function (e) {
            // 关闭正在上传
            that.setData({
              uploadHidden: true,
            });

            var report = JSON.parse(e.data);
            // 没有检测到舌头
            if (report["tongue_exist"] == 0) {
              that.setData({
                upload_status: false,
                upload_dic: "没有检测到舌头，请重新拍摄"
              });
            }

            // 检测到舌头
            else {
              app.globalData.imagelist = that.data.imagelist.concat(pic) // 保存图片
              app.globalData.mHidden = true
              if (that.data.imagecount == 0) {
                that.setData({
                  imagecount: 1,
                })
                app.globalData.imagecount = that.data.imagecount
                app.globalData.tonguefeature[0] = that.data.feature[0].concat(report["tongue_proper_color"])
                app.globalData.tonguefeature[1] = that.data.feature[1].concat(report["tongue_shape_pang"])
                app.globalData.tonguefeature[2] = that.data.feature[2].concat(report["tongue_shape_neng"])
                app.globalData.tonguefeature[3] = that.data.feature[3].concat(report["tongue_shape_chi"])
                app.globalData.tonguefeature[4] = that.data.feature[4].concat(report["tongue_moss_color"])
                app.globalData.tonguefeature[5] = that.data.feature[5].concat(report["tongue_moss_nature"])
                wx.navigateTo({
                  url: '/pages/tongue/tongue',
                })
              }
              // 分析结果并跳转到结果界面
              else if (that.data.imagecount == 1) {
                that.setData({
                  imagecount: 0,
                })
                app.globalData.imagecount = that.data.imagecount
                app.globalData.tonguefeature[0] = that.data.feature[0].concat(report["tongue_proper_color"])
                app.globalData.tonguefeature[1] = that.data.feature[1].concat(report["tongue_shape_pang"])
                app.globalData.tonguefeature[2] = that.data.feature[2].concat(report["tongue_shape_neng"])
                app.globalData.tonguefeature[3] = that.data.feature[3].concat(report["tongue_shape_chi"])
                app.globalData.tonguefeature[4] = that.data.feature[4].concat(report["tongue_moss_color"])
                app.globalData.tonguefeature[5] = that.data.feature[5].concat(report["tongue_moss_nature"])
                wx.navigateTo({
                  url: '/pages/tonguereport/tonguereport', // 这里跳转到结果界面
                })
              }
            }
          },
          fail: function (t) {
            that.setData({
              //上传失败  
              upload_status: false,
              upload_dic: "上传失败，请重新拍照",
            })
          },
        })
      },
      fail: (res) => {
        that.setData({
          upload_status: false,
          upload_dic: "拍照失败，请重新拍照",
        })
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
          uploadHidden: false, // 显示正在上传
        })
        // wx.showLoading({
        //   title: '上传中',
        // })

        //上传图片到服务器  
        var pic = res.tempFilePaths[0];
        console.log(pic)
        wx.uploadFile({
          // 本地地址
          // url: 'http://127.0.0.1:9200/tongue/uploadimage', 
          // url: 'http://58.199.160.140:9200/tongue/uploadimage',

          // 云实验室服务器地址
          url: 'https://www.lib61504.top:9200/tongue/uploadimage',
          // url: 'https://118.31.76.165:9200/tongue/uploadimage',
          filePath: String(pic),
          name: 'image',
          success: function (e) {
            // 关闭正在上传
            that.setData({
              uploadHidden: true,
            });

            var report = JSON.parse(e.data);
            // 没有检测到舌头
            if (report["tongue_exist"] == 0) {
              that.setData({
                upload_status: false,
                upload_dic: "没有检测到舌头，请重新拍摄"
              });
            }

            // 检测到舌头
            else {
              app.globalData.imagelist = that.data.imagelist.concat(pic) // 保存图片
              app.globalData.mHidden = true
              if (that.data.imagecount == 0) {
                that.setData({
                  imagecount: 1,
                  
                })
                app.globalData.imagecount = that.data.imagecount
                app.globalData.tonguefeature[0] = that.data.feature[0].concat(report["tongue_proper_color"])
                app.globalData.tonguefeature[1] = that.data.feature[1].concat(report["tongue_shape_pang"])
                app.globalData.tonguefeature[2] = that.data.feature[2].concat(report["tongue_shape_neng"])
                app.globalData.tonguefeature[3] = that.data.feature[3].concat(report["tongue_shape_chi"])
                app.globalData.tonguefeature[4] = that.data.feature[4].concat(report["tongue_moss_color"])
                app.globalData.tonguefeature[5] = that.data.feature[5].concat(report["tongue_moss_nature"])
                wx.navigateTo({
                  url: '/pages/tongue/tongue',
                })
              }
              // 分析结果并跳转到结果界面
              else if (that.data.imagecount == 1) {
                that.setData({
                  imagecount: 0,
                })
                app.globalData.imagecount = that.data.imagecount
                app.globalData.tonguefeature[0] = that.data.feature[0].concat(report["tongue_proper_color"])
                app.globalData.tonguefeature[1] = that.data.feature[1].concat(report["tongue_shape_pang"])
                app.globalData.tonguefeature[2] = that.data.feature[2].concat(report["tongue_shape_neng"])
                app.globalData.tonguefeature[3] = that.data.feature[3].concat(report["tongue_shape_chi"])
                app.globalData.tonguefeature[4] = that.data.feature[4].concat(report["tongue_moss_color"])
                app.globalData.tonguefeature[5] = that.data.feature[5].concat(report["tongue_moss_nature"])
                wx.navigateTo({
                  url: '/pages/tonguereport/tonguereport', // 这里跳转到结果界面
                })
              }
            }
          },
          fail: function (t) {
            that.setData({
              //上传失败  
              upload_status: false,
              upload_dic: "上传失败，请重新拍照",
            })
          },
        })
      },
      fail: (res) => {
        that.setData({
          // 选择图片失败
          upload_status: false,
          upload_dic: "选择图片失败，请重新选择或拍照",
        })
      },
    })
  },

  // 获取用户相机授权
  getCameraSetting() {
    const that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 用户已经授权
          that.setData({
            authCamera: true
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
                authCamera: true
              });
              wx.navigateBack({
                delta: 1,
              });
            },
            fail() { // 用户不同意授权
              that.setData({
                authCamera: false
              });
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
        });
        that.setData({
          authCamera: false
        });
        wx.navigateBack({
          delta: 1,
        });
      }
    })
  },

  onLoad: function () {
    this.setData({
      imagelist: app.globalData.imagelist, // 保存用户拍的两张照片
      imagecount: app.globalData.imagecount,
      mHidden: app.globalData.mHidden, // 拍照提示是否隐藏
      feature: app.globalData.tonguefeature,
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