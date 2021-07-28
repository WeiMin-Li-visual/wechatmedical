// pages/telphone/telphone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"dzb",
    phone:"",
    code:""

  },

  binTxt:function(e){
    console.log(e);
    console.log(1);
    this.setData({message:e.detail.value});
  },

  binPhone:function(e){
    this.setData({phone:e.detail.value});
  },

  binCode:function(e){
    this.setData({code:e.detail.value});
  },

  login:function(e){
    console.log(this.data.phone,this.data.code);
    // 将手机号和验证码发送到后端，后端进行登录。
    wx.request({
      url: 'http://127.0.0.1:5000/login',
      data: {phone:this.data.phone,code:this.data.code},
      method: "POST",
      success: function(result) {
        console.log(result);
      }
    })
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

  }
})