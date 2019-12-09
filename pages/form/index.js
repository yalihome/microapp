// pages/form/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countries: [
      {
        name: "美国",
        val: 1
      },
      {
        name: "日本",
        val: 2
      },
      {
        name: "法国",
        val: 3
      },
      {
        name: "韩国",
        val: 4
      },
      {
        name: "德国",
        val: 5
      },
      {
        name: "中国",
        val: 6
      }
    ],
    "hobbies": [
      {
        name: "登山",
        val: 1
      },
      {
        name: "看书",
        val: 2
      },
      {
        name: "运动",
        val: 3
      },
      {
        name: "绘画",
        val: 4
      }
    ],
    "textVal": "",
    "pic": "http://cdn.dev.terran.wxpai.cn/upload/sandbox/cd0a79e8-1109-482d-a6dc-d55be7e9a1ed.jpg"
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
      return {
        title:"表单使用案例",
        path:"/pages/form/index",
        imageUrl: this.data.pic
      }
  },
  inputChange(e) {
    let { type } = e.currentTarget.dataset;
    switch (type) {
      case "radio":
      case "checkbox":
        console.log(e.detail);
        break;
      case "textarea":
        console.log(e.detail);
        break;
      case "switch":
        console.log(e.detail);
        break;
    }
  },
  changeTextarea(e) {
    this.setData({
      "textVal": "test"
    })
  },
  getCurUserInfo(e){
    console.log(e);
  },
  getphonenumber(e){
    console.log(e);
  },
  opensetting(e){
    console.log(e);
  }
})