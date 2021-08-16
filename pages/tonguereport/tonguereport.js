//获取应用实例
const app = getApp()
var util = require("../../util.js");
var config = require("../../config.js");

Page({
    data: {
        imagelist: ["/static/image/healthknos/healthhkno1.jpg", "/static/image/healthknos/healthhkno1.jpg"],

        navData: [{
                text: '表征分析'
            },
            {
                text: '调理建议'
            },
        ],

        report: [{
                tongue_proper_color: app.globalData.tonguefeature
            },
            {
                suggest: "请按医生指导进行调理"
            },
        ],
        currentTab: 0,
        navScrollLeft: 0,
    },

    switchNav(event) {
        var cur = event.currentTarget.dataset.current;
        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.windowWidth / 2;
        //tab选项居中                            
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth
        })
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },

    switchTab(event) {
        var cur = event.detail.current;
        var singleNavWidth = this.data.windowWidth / 2;
        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 2) * singleNavWidth
        });
    },

    onLoad: function () {
        var time = util.formatTime(new Date());
        this.setData({
            time: time
        });
        var tongue_color_index = 0;
        var tongue_shape_index = 0;
        var tongue_moss_color_index = 0;
        var tongue_moss_nature_index = 0;
        // 舌色索引
        if (app.globalData.tonguefeature[0][0] > app.globalData.tonguefeature[0][1]) {
            tongue_color_index = app.globalData.tonguefeature[0][0];
        } else {
            tongue_color_index = app.globalData.tonguefeature[0][1];
        }
        // 舌型索引
        if (app.globalData.tonguefeature[1][0] > app.globalData.tonguefeature[1][1]) {
            tongue_shape_index = app.globalData.tonguefeature[1][0];
        } else {
            tongue_shape_index = app.globalData.tonguefeature[1][1];
        }
        if (app.globalData.tonguefeature[2][0] > tongue_shape_index) {
            tongue_shape_index = app.globalData.tonguefeature[2][0];
        }
        if (app.globalData.tonguefeature[2][1] > tongue_shape_index) {
            tongue_shape_index = app.globalData.tonguefeature[2][1];
        }
        if (app.globalData.tonguefeature[3][0] > tongue_shape_index) {
            tongue_shape_index = app.globalData.tonguefeature[3][0];
        }
        if (app.globalData.tonguefeature[3][1] > tongue_shape_index) {
            tongue_shape_index = app.globalData.tonguefeature[3][1];
        }

        // 舌苔色索引
        if (app.globalData.tonguefeature[4][0] > app.globalData.tonguefeature[4][1]) {
            tongue_moss_color_index = app.globalData.tonguefeature[4][0];
        } else {
            tongue_moss_color_index = app.globalData.tonguefeature[4][1];
        }

        // 舌苔质索引
        if (app.globalData.tonguefeature[5][0] > app.globalData.tonguefeature[5][1]) {
            if (app.globalData.tonguefeature[5][0] == 2) {
                tongue_moss_nature_index = 0;
            } else {
                tongue_moss_nature_index = app.globalData.tonguefeature[5][0];
            }
        } else {
            if (app.globalData.tonguefeature[5][0] == 2) {
                tongue_moss_nature_index = 0;
            } else {
                tongue_moss_nature_index = app.globalData.tonguefeature[5][1];
            }
        }

        this.setData({
            imagelist: app.globalData.imagelist, // 保存用户拍的两张照片
            imagecount: app.globalData.imagecount,
            mHidden: app.globalData.mHidden, // 拍照提示是否隐藏
            tongue_color: config.tongue_color[tongue_color_index],
            tongue_shape: config.tongue_shape[tongue_shape_index],
            tongue_moss_color: config.tongue_moss_color[tongue_moss_color_index],
            tongue_moss_nature: config.tongue_moss_nature[tongue_moss_nature_index],
        });
    },

    onUnload:function () {
        app.globalData.imagecount = 0;
        app.globalData.mHidden=false;
        app.globalData.imagelist=[];
        app.globalData.tonguefeature=[[],[],[],[],[],[]];
    
        wx.reLaunch({
          url: '/pages/index/index',
        });
    }
})