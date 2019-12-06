// components/cards/product/product.js
Component({
  options:{
    pureDataPattern:/^_/
  },
  /**
   * 组件的属性列表
   */
  properties: {
      item:{
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
    onItem(ev){
      this.setData({
        _hash: "test"
      });
      return;
      wx.navigateTo({
        url:"/pages/product/product?id="+this.data.item.id
      })
    }
  },
  observers:{
    "_hash":function(val){
      console.log("_hash value not change, but observer triggered.")
    }
  }
})
