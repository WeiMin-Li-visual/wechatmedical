var config = require("../../config.js");

Page({
  onLoad: function (options) {
    var that = this;
    that.setData({
      swiperlist: config.swiperlist[options.id - 1]
    });
  }
})