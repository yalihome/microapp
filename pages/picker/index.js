// pages/picker/index.js
const cons = require("../../components/common/consts");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerVal: [],
    countries: cons.countries,
    hobbies: cons.hobbies
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
      console.log(getCurrentPages());
      console.log(app.globalData);
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
  ,selectChange(e){
    console.log(e);
  }
  ,pickstart(e){
    console.log("pick start");
    console.log(e);
  }
  ,pickend(e){
    console.log("pick end");
    console.log(e);
  }
})