Component({
  properties: {
    HistoryRecord: {
      type: Array
    }
  },
  data: {

  },
 methods:{
  jumpCurrentPage() {
    this.triggerEvent('switchHistoryPage')
  },
  dealCurrentData(e){
    wx.navigateTo({
      url: '/pages/orderChildren/orderChildren',
      success:function(res){
        // console.log(e.currentTarget.dataset.arr);
        res.eventChannel.emit('inspectPageData', {
          data: {...e.currentTarget.dataset.arr,titleText:'history'}
        })
      }
    })
  }
 }
})