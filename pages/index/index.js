// pages/index/index.js

//获取应用实例
var app = getApp();
var config = require("../../config.js");

Page({

  /**
   * 页面的初始数据
   */

  // 不在page的生命周期内，可以用来充当一个变量的数组，这里面申请的变量都可以在wxml中使用
  data: {

    CustomBar: app.globalData.CustomBar,
    hidden: true,
    current: 0,
    lines: 0,

    // 轮播
    swiperlist: [{
      id: 0,
      url: '/static/image/1.jpg',
      type: 0
    }, {
      id: 1,
      url: '/static/image/2.jpg',
      type: 0
    }, {
      id: 2,
      url: '/static/image/3.jpg',
      type: 0
    }],

    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,

    iconList: [{
      id: 1,
      url: '/pages/tongu/tongu',
      image: '/static/image/tongu.png',
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
    }, {
      id: 4,
      url: '/pages/healthreport/healthreport',
      image: '/static/image/i1.png',
      text: '健康报告'
    }],
  },

  swiperchange: function (e) {
    this.setData({
      current: e.detail.current
    });
  },

  swipclick: function (e) {
    let that = this;
    var swip = that.data.swiperlist[that.data.current];
    console.log(swip);
    if (swip.type === 0) {
      wx.navigateTo({
        url: '/pages/index/doc/doc?id=' + swip.id
      });
    }
  },


  gotopage: function (event) {
    wx.reLaunch({
      url: event.currentTarget.dataset.hi
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(config.healthknos);
    that.setData({
      healthknos: config.healthknos
    });
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
    // 转发
    return {
      title: '首页',
      desc: '助力中医发展',
      path: '/page/index/index'
    }

  },

  // click: function () {
  //   console.log("点击了文字");
  //   if (flag) {
  //     color = "c1-bule";
  //     flag = false;
  //   } else {
  //     color = "c1";
  //     flag = true;
  //   }
  //   this.setData({
  //     color
  //   });
  // },

  // // 点击事件，跳转页面
  // clickme: function (e) {
  //   var nid = e.currentTarget.dataset.nid;
  //   // 跳转
  //   wx.navigateTo({
  //     url: '/pages/redirect/redirect?id=' + nid,
  //   })
  // },

  // tongu: function (e) {
  //   var nid = e.currentTarget.dataset.nid;
  //   // 跳转
  //   wx.navigateTo({
  //     url: '/pages/tongu/tongu?id=' + nid,
  //   })
  // },

  // face: function (e) {
  //   var nid = e.currentTarget.dataset.nid;
  //   // 跳转
  //   wx.navigateTo({
  //     url: '/pages/face/face?id=' + nid,
  //   })
  // },

  // palm: function (e) {
  //   var nid = e.currentTarget.dataset.nid;
  //   // 跳转
  //   wx.navigateTo({
  //     url: '/pages/palm/palm?id=' + nid,
  //   })
  // },
})