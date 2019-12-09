// pages/swiper/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "banners": [
      "http://cdn.dev.terran.wxpai.cn/upload/sandbox/cd0a79e8-1109-482d-a6dc-d55be7e9a1ed.jpg",
      "http://cdn.dev.terran.wxpai.cn/upload/sandbox/15a9459e-0e68-4f11-b71b-aaabefe4c2ec.jpg",
      "http://cdn.dev.terran.wxpai.cn/upload/sandbox/81dad6fa-336e-4f7d-8b39-23081c410908.jpg"
    ],
    "hasDots": true,
    "autoplay": true,
    "duration": 1000,
    "interval": 2000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
        title:"swiper"
      })
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
  changeSlider(e){
    let {type} = e.currentTarget.dataset;
    this.setData({
      [type]: e.detail.value
    })
  }
})