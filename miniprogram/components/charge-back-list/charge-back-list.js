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
  }
})