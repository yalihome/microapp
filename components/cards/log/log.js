// components/cards/log/log.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    doSomething(ev) {
      // console.log(ev.detail);
      // console.log(this.data);
      // console.log(this.properties);
      // console.log(this.dataset);
      // console.log(this.is);
      // console.log(this);
      //向引用页面发送一个触发事件
      // ,{test:""}
      this.triggerEvent("myevent",this.data.item);
    }
  },
  /**
   * 组件内外部数据监听
   */
  observers: {
    "item": function (nval) {
      // console.log(nval)
    }
  }
})
