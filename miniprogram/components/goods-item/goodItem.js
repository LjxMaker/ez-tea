// components/goods-item/goodItem.js
const computedBehavior = require("miniprogram-computed").behavior

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [computedBehavior],
  properties: {
    goods_data: {
      type: Object,
      value: {}
    },
    shopCartData: {
      type: Array,
      value: []
    }

  },

  /**
   * 组件的初始数据
   */
  data: {},

  computed: {
    num(data) {
      let arr = data.shopCartData.filter(ele =>
        ele.cookId === data.goods_data.cookId
      )


      let x = 0
      arr.forEach(ele => {
        x += ele.quantity
      })

      return x;
    }
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