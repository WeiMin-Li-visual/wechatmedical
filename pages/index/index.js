// pages/index/index.js

var flag=true;
var color;

Page({

  /**
   * 页面的初始数据
   */

   // 不在page的生命周期内，可以用来充当一个变量的数组，这里面申请的变量都可以在wxml中使用
  data: {
    color:"c1",
    hello:"Hello World"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  click:function(){
    console.log("点击了文字");
    if(flag){
      color="c1-bule";
      flag=false;
    }else{
      color="c1";
      flag=true;
    }this.setData({
      color
    });
  },

  // 点击事件，跳转页面
  clickme:function(e){
    var nid=e.currentTarget.dataset.nid;
    // 跳转
    wx.navigateTo({
      url: '/pages/redirect/redirect?id='+nid,
    })
  },
})