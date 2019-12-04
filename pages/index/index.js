//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    products:[
      {
        id: 1,
        product_name: "固本堂手工东阿阿胶固体原糕阿胶片月子补身女人宝",
        product_pic: "",
        sale_price: 177,
        out: 1320
      },
      {
        id: 2,
        product_name: "固本堂手工东阿阿胶固体原糕阿胶片月子补身女人宝",
        product_pic: "",
        sale_price: 196,
        out: 27
      },
      {
        id: 3,
        product_name: "固本堂手工东阿阿胶固体原糕阿胶片月子补身女人宝",
        product_pic: "",
        sale_price: 388,
        out: 100
      },
      {
        id: 4,
        product_name: "固本堂手工东阿阿胶固体原糕阿胶片月子补身女人宝",
        product_pic: "",
        sale_price: 398,
        out: 6
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
