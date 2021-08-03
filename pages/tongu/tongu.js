//获取应用实例
var app = getApp();

Page({
  data: {
    image_src: '',
    devicePosition: 'front', // 相机前后置
    authCamera: false, //用户是否运行授权拍照  
    flash: false, // 闪光灯，默认关闭
    
    upload_status: ""
  },

  closeModel: function () {
    var that = this
    that.setData({
      mHidden: true
    });
  },

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
      devicePosition: "back" === this.data.devicePosition ? "front" : "back"
    });
  },

  //拍摄照片  
  takePhoto: function () {
    
    var that = this;
    console.log("count",that.data.count)
    wx.createCameraContext().takePhoto({
      quality: 'high', //拍摄质量(high:高质量 normal:普通质量 low:高质量)  
      success: (res) => {
        //拍摄成功  
        //照片文件的临时文件  

        //上传图片到服务器  
        var pic = res.tempImagePath;
        wx.uploadFile({
          url: 'http://127.0.0.1:5000/uploadImage',
          filePath: String(pic),
          name: 'image',
          success: function (e) {
            console.log("e",e)
            console.log(pic)
            // upload_status="上传成功"
            app.globalData.tonguimagelist = that.data.tonguimagelist.concat(pic) // 保存图片

            if (that.data.count== 0) {
              app.globalData.tongucount = 1
              wx.navigateTo({
                url: '/pages/tongu/tongu',
              })
            }
            else if(that.data.count==1){
              app.globalData.tongucount = 0
              wx.navigateTo({
                url: '/pages/tongu/tongu',   // 这里跳转到结果界面
              })
            }
            
            app.globalData.tongumHidden = true
          
          },
          fail: function (t) {
            //上传失败  
            upload_status = "上传失败"
            mHidden = true
            app.globalData.tongucount = 0
          },
        })
      },
      fail: (res) => {
        //拍摄失败  
        upload_status = "拍照失败，请重新拍摄"
        mHidden = true
        app.globalData.tongucount = 0
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
    this.setData({
      tonguimagelist: app.globalData.tonguimagelist, // 保存用户拍的两张照片
      count: app.globalData.tongucount,
      mHidden: app.globalData.tongumHidden, // 拍照提示是否隐藏
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
      success: function (e) {}
    })
  },

  onReady: function () {

  }
})