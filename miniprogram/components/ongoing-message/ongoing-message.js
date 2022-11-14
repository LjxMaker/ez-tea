Component({
  properties: {
    OngoingMessage: {
      type: Array
    }
  },
  lifetimes: {
    created() {
    }
  },

  methods: {
    jumpCurrentPage() {
      this.triggerEvent('switchOngoingPage')
    },
    dealCurrentData(e){
      wx.navigateTo({
        url: '/pages/orderChildren/orderChildren',
        success:function(res){
          console.log(e.currentTarget.dataset.arr);
          let a=e.currentTarget.dataset.arr
          let b=a.temperStatus=='manufacture'?'manufacture':'ongoing'
          res.eventChannel.emit('deliveryPageData', {
            data: {...a,titleText:b}
          })
        }
      })
    }
  }

})