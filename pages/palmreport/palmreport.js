//获取应用实例
const app = getApp()
var util = require("../../util.js");
var config = require("../../config.js");

Page({
    data: {
        palmimagelist: ["/static/image/healthknos/healthhkno1.jpg", "/static/image/healthknos/healthhkno1.jpg"],
        navData: [{
                text: '表征分析'
            },
            {
                text: '调理建议'
            },
        ],

        report: [{
                palm_proper_color: app.globalData.palmfeature
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
    },

    onShow: function () {
        var palm_color_index = 0;

        // 掌色索引
        if (app.globalData.palmfeature[0][0] > app.globalData.palmfeature[0][1]) {
            palm_color_index = app.globalData.palmfeature[0][0];
        } else {
            palm_color_index = app.globalData.palmfeature[0][1];
        }

        this.setData({
            palmimagelist: app.globalData.palmimagelist, // 保存用户拍的两张照片
            count: app.globalData.palmcount,
            mHidden: app.globalData.palmmHidden, // 拍照提示是否隐藏
            palm_color: config.palm_color[palm_color_index],
        });
    },

    onUnload:function () {
        app.globalData.palmcount = 0;
        app.globalData.palmmHidden=false;
        app.globalData.palmimagelist=[];
        app.globalData.palmfeature=[[]];

        wx.reLaunch({
          url: '/pages/index/index',
        });
    }
})