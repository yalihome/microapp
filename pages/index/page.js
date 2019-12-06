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
    ],
    "cates":[
      {
        name:"全部",
        id:1
      },
      {
        name:"美妆",
        id:2
      },
      {
        name:"服装",
        id:3
      },
      {
        name:"箱包",
        id:4
      },
      {
        name:"水果",
        id:5
      },
      {
        name:"母婴",
        id:6
      },
      {
        name:"男士",
        id:7
      },
    ],
    curCate: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (o) {
    console.log(o);
    console.log("page 的 load 方法执行了");
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
  onShow:function(o){
    console.log(o);
    console.log("page 的 show 方法执行了");
  },
  onHide:function(o){
    console.log("page 的 hide 方法执行了")
  },
  onReady:function(o){
    wx.setNavigationBarTitle({
      title:"微商城"
    })
    console.log(o);
    console.log("page 的 ready 方法执行了");
    console.log(this.route);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  selectCate(e){
    let {index} = e.currentTarget.dataset;
    this.setData({
      curCate: index
    });
    console.log(Page.route);
  },
  onShareAppMessage(o){
    console.log(o);
    console.log("调用了分享");
    return {
      title: "简单的微商城",
      path: "pages/logs/logs",
      imageUrl: "http://cdn.dev.terran.wxpai.cn/upload/sandbox/da62c67b-b0d6-4396-b5a1-33f1a55efb55.png"
    }
  },
  onPageScroll(e){
      // console.log(e);
  }
})
