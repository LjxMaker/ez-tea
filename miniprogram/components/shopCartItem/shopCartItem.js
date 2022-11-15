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

    sum_price(data){
      return data.goods_data.price * data.goods_data.quantity
    },

    typeWords(data){
      if(data.goods_data.temp){
        if (!data.goods_data.temp && !data.goods_data.sugar) {
            return ''
        }else if(data.goods_data.temp && !data.goods_data.sugar){
          return data.goods_data.temp[data.goods_data.tempType]
        }else if(!data.goods_data.temp && data.goods_data.sugar){
          return data.goods_data.sugar[data.goods_data.sugarType]
        }else{
          return  data.goods_data.temp[data.goods_data.tempType] + '/' + data.goods_data.sugar[data.goods_data.sugarType]
        }
        return ''

      }else{
        return ''
      }

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    shopCartAddGood() {
      this.triggerEvent('shopCartAddGood', this.properties.goods_data)
    },

    shopCartCutGood() {
      this.triggerEvent('shopCartCutGood', this.properties.goods_data)
    }
  }
})