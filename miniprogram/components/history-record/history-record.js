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
 }
})