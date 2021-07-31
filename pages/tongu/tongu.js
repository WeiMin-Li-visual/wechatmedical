// pages/tongu/tongu.js
Page({
  data: {
    // imagelist: [],
    image_src: '',
    devicePosition: 'back', // 相机前后置
    authCamera: false, //用户是否运行授权拍照  
    flash: false, // 闪光灯，默认关闭
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
      devicePosition: "back" === this.data.devicePosition ? "front" : "back"
    });
  },

  //拍摄照片  
  takePhoto: function () {
    console.log("000");
    wx.createCameraContext().takePhoto({
      quality: 'high', //拍摄质量(high:高质量 normal:普通质量 low:高质量)  
      success: (res) => {
        //拍摄成功  
        //照片文件的临时文件  

        //上传图片到服务器  
        var pic = res.tempImagePath;
        console.log(pic);
        wx.uploadFile({
          url: 'http://127.0.0.1:5000/uploadImage',
          filePath: String(pic),
          name: 'image',
          success: function (e) {
            console.log(e)
          },
          fail: function (t) {
            //上传失败  
            console.log(t)
          },
        })
      },
      fail: (res) => {
        //拍摄失败  
      },
    })
  },

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
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.camera"]) {
          console.log("111")
          this.setData({
            authCamera: true,
          })
        } else {
          console.log("222")
          this.setData({
            authCamera: false,
          })
        }
      }
    });
  },

  // 选择图片
  chooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多选择多少张
      sizeType: ['original', 'compressed'], // 大小，是否原图
      // sourceType: ['album', 'camera'], //相册或相机获取
      sourceType: ['album'],
      success: function (res) {
        var pic = res.tempFilePaths
        wx.uploadFile({
          url: 'http://127.0.0.1:5000/uploadImage',
          filePath: String(pic),
          name: 'image',
          success: function (e) {
            console.log(e)
          }
        })

        // // 在默认图片之后加图片；
        // const img = res.tempFilePaths
        // that.setData({
        //   image_src: img,
        //   // imagelist: that.data.imagelist.concat(res.tempFilePaths)
        // });
      }
    })
  },

  // // 上传图片
  // uploadImage() {
  //   wx.request({
  //     url: 'http://127.0.0.1:5000/uploadImage',
  //     data: {
  //       imagelist: this.data.imagelist
  //     },
  //     method: "POST",
  //     success: function (result) {
  //       console.log(result);
  //     }
  //   })
  // }

  uploadImage() {
    var that = this
    var pic = that.data.image_src
    // var pic1=that.data.imagelist
    wx.uploadFile({
      url: 'http://127.0.0.1:5000/uploadImage',
      filePath: String(pic),
      name: 'image',
      success: function (e) {
        console.log(e)
      }
    })
  }
})