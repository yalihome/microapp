// components/cards/product/product.js
//在页面中如何监听数据变化
//组件或者页面中任何一方调用了 setData ，是不是组件和页面中的数据都会一起更新
Component({
  options: {
    pureDataPattern: /^_/,
    styleIsolation: "isolated"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    },
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    _hash: "test"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItem(ev) {
      this.setData({
        "item.is_select": this.data.item.is_select?1:0
      });
      return;
      wx.navigateTo({
        url: "/pages/product/product?id=" + this.data.item.id
      })
    }
  },
  ready: function (o) {
    // console.log("一级参数层级的 ready 方法执行")
    // console.log(o);
    // console.log(this.data)
  },
  observers: {
    "_hash": function (val) {
      console.log("_hash value not change, but observer triggered.")
    }
  },
  lifetimes: {
    created: function (o) {
      // console.log("lifetimes 内部的 created 方法执行")
      // console.log(o);
      // console.log(this.data)
    },
    ready: function (o) {
      // console.log("lifetimes 内部的 ready 方法执行")
      // console.log(o);
      // console.log(this.data)
    },
    attached: function (o) {
      //组件实例进入页面节点树
      // console.log("lifetimes 内部的 attached 方法执行")
      // console.log(o);
      // console.log(this.data)
    }
  }
})
