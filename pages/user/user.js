Page({

  onShareAppMessage(result){
    // 转发
    return {
      title: '慧诊',
      desc: '助力中医发展',
      imageUrl:"/static/image/logo.jpg",
      path: '/page/index/index'
    }
  } 
})