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
          // console.log(e.currentTarget.dataset.arr);
          res.eventChannel.emit('deliveryPageData', {
            data: {...e.currentTarget.dataset.arr,titleText:'ongoing'}
          })
        }
      })
    }
  }

})