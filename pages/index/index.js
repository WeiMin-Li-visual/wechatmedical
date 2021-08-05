//获取应用实例
var app = getApp();
var config = require("../../config.js");

Page({
  // 不在page的生命周期内，可以用来充当一个变量的数组，这里面申请的变量都可以在wxml中使用
  data: {
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    current: 0,
    lines: 0,

    userInfo: app.globalData.userInfo,
    hasUserInfo: app.globalData.hasUserInfo,
    canIUseGetUserProfile: app.globalData.canIUseGetUserProfile,

    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,

    iconList: [{
      id: 1,
      url: '/pages/tongue/tongue',
      image: '/static/image/tongue.png',
      text: '舌诊'
    }, {
      id: 2,
      url: '/pages/face/face',
      image: '/static/image/face.png',
      text: '面诊'
    }, {
      id: 3,
      url: '/pages/palm/palm',
      image: '/static/image/palm.png',
      text: '手诊'
    }
    // , {
    //   id: 4,
    //   url: '/pages/healthreport/healthreport',
    //   image: '/static/image/i1.png',
    //   text: '健康报告'
    // }
  ],
  },

  swiperchange: function (e) {
    this.setData({
      current: e.detail.current
    });
  },

  gotopage: function (event) {
    wx.reLaunch({
      url: event.currentTarget.dataset.url
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      healthknos: config.healthknos,
      swiperlist:config.swiperlist
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // 转发
    return {
      title: '慧诊',
      desc: '助力中医发展',
      imageUrl:"/static/image/logo.jpg",
      path: '/page/index/index'
    }
  },
})