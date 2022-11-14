Component({
  properties: {
    ChargeBackList: {
      type: Array
    }
  },
  data: {

  },
  methods:{
    jumpCurrentPage() {
      this.triggerEvent('switchChargePage')
    },
    dealCurrentData(e){
      wx.navigateTo({
        url: '/pages/orderChildren/orderChildren',
        success:function(res){
          let a=e.currentTarget.dataset.arr
          res.eventChannel.emit('deliveryPageData', {
            data: {...a,titleText:'chargeBack'}
          })
        }
      })
    }
  }
})