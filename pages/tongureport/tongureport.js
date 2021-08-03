//获取应用实例
const app = getApp()
// const util=require("../../util")

Page({
    data: {
        navData: [{
                text: '表征'
            },
            {
                text: '调理建议'
            },
        ],
        currentTab: 0,
        navScrollLeft: 0,
        currentTime: " "
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

    // onLoad:function() {
    //     var date=util.formatTime(new Date());
    //     this.setData({
    //         date:date
    //     });
    // }
})