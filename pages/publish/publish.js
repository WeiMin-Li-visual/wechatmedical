// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagelist:["/static/image/a.jpg","/static/image/b.jpg"]
  },

  uploadImage(){
    var that=this;
    wx.chooseImage({
      count: 9,  // 最多选择多少张
      sizeType:['original', 'compressed'],  // 大小，是否原图
      sourceType:['album', 'camera'],  //相册或相机获取
      success:function(res){
        
        // // 设置imagelist
        // that.setData({
        //   imagelist:res.tempFilePaths
        // });

        // 在默认图片之后加图片；

        that.setData({
          imagelist:that.data.imagelist.concat(res.tempFilePaths)
        });
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