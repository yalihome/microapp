//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log, i) => {
        return {
          desc: i,
          create_time: util.formatTime(new Date(log))
        }
      })
    })
  },
  onMyEvent: function (e) {
      console.log(e);
  }
})
