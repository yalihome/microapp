// pages/form/index.js
const cons = require("../../components/common/consts");

var students = ["刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰刘杰", "刘月", "刘万富", "邓凤云"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "cons.countries": cons.countries,
    "cons.hobbies": cons.hobbies,
    "textVal": "",
    "pic": "http://cdn.dev.terran.wxpai.cn/upload/sandbox/cd0a79e8-1109-482d-a6dc-d55be7e9a1ed.jpg",
    "selectedCountry": "",
    "selectedCountryIdx": "",
    "columnArr": [cons.countries, cons.hobbies, cons.sexies],
    "columnVal": [0, 0, 0],
    "curStudent": 0,
    "students": students,
    "curTime": "12:35",
    "curDate": "2019-12-11",
    "curRegion": ["广东省", "广州市", "天河区"],
    "curRegionStr": "",
    readOnly: false,
    placeholder: "限于30字以内",
    showImgSize: true,
    showImgTb: true,
    editorCon: "",
    contentLen: 0
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
    //获取编辑器组件
    console.log(this.globalData);
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
      title: "表单使用案例",
      path: "/pages/form/index",
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
      case "picker":
        console.log("bindchange picker");
        console.log(e.detail);
        let val = e.detail.value;
        this.setData({
          selectedCountry: this.data.cons.countries[val].name
        })
        break;
      case "multi-picker":
        console.log("bindchange multi-picker");
        console.log(e.detail);
        // let val = e.detail.value;
        // this.setData({
        //   selectedCountry: this.data.cons.countries[val].name
        // })
        break;
      case "string-picker":
        console.log("bindchange string-picker");
        console.log(e.detail);
        console.log(this.data.curStudent)
        // let val = e.detail.value;
        // this.setData({
        //   selectedCountry: this.data.cons.countries[val].name
        // })
        break;
      case "time":
        console.log("bindchange time");
        console.log(e.detail);
        this.setData({
          curTime: e.detail.value
        })
        break;
      case "date":
        console.log("bindchange date");
        console.log(e.detail);
        this.setData({
          curDate: e.detail.value
        })
        break;
      case "region":
        console.log("bindchange region");
        console.log(e.detail);
        this.setData({
          curRegion: e.detail.value,
          curRegionStr: e.detail.value.join("")
        })
        console.log(this.data.curRegion);
        break;
    }
  },
  pickerColumnChange(e) {
    console.log("plcker column change");
    console.log(e);
  },
  changeTextarea(e) {
    this.setData({
      "textVal": "test"
    })
  },
  getCurUserInfo(e) {
    console.log(e);
  },
  getphonenumber(e) {
    console.log(e);
  },
  opensetting(e) {
    console.log(e);
  },
  chanePicker(e) {
    console.log(e.detail);
  },
  editorReady(e) {
    console.log("编辑器初始化完成");
    console.log(e);
    let {id} = e.currentTarget.dataset;
    this.createSelectorQuery().select("#"+id).context((res) => {
      this[id] = res.context;
      console.log(this[id]);
    }).exec();
  },
  editorInput(e) {
    console.log("编辑器输入");
    console.log(e);
    //实时更新内容，并且显示输入的文案长度，貌似小程序端是可以输入表情的，肿么破。。。
    //todo 输入一下就会失去焦点，这是什么问题：貌似是获取编辑器输入内容的同时设置别的编辑器的内容引起的
    this.editor.getContents({
      success: (res) => {
        console.log("富文本编辑器内容获取")
        console.log(res);
        this.setData({
          editorCon: res.html,
          contentLen: res.text.length
        });
        this.editor1.setContents({
          html: this.data.editorCon,
          success: (res) => {
            console.log("set editor1's content succeed");
          },
          fail: (res) => {
            console.log("set editor1's content failed");
          }
        })
      }
    })
  },
  editorBlur(e) {
    console.log("编辑器失去焦点");
    console.log(e);
  },
  editorFocus(e) {
    console.log("编辑器聚焦");
    console.log(e);
  },
  editorStatusChange(e) {
    console.log("通过 Context 方法改变了编辑器内部样式");
    console.log(e);
  }
})