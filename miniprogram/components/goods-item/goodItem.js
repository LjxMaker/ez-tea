// components/goods-item/goodItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods_data: {
      type: Object,
      value: {}
    },
    shopCartData: {
      type: Number,
      value: 0
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
    addGood() {
      this.triggerEvent('addGood', this.properties.goods_data)
    },

    cutGood() {
      this.triggerEvent('addGood', this.properties.goods_data)
    }
  }
})