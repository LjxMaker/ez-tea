// pages/submitorder/submitorder.js
const computedBehavior = require("miniprogram-computed").behavior
const db = wx.cloud.database();

Page({
  behaviors: [computedBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    shopCartData: [],
    storeAddress: "11111111",
    storeDetilAddress: "4444444",
    storeDistance: "222222222",
    currentDate: '立刻取餐',
    goods_flot: false,
    storeCloseTime: '22:30',
    orderId: '',
    timeArray: '',
    choseTime: '立刻取餐',
    index: 0,
    shownote: false,
    noteValue: '',
    allNum: 0,
    allQuantity: 0,
  },

  computed: {
    sum_price(data) {
      let x = 0
      data.shopCartData.forEach(ele => {
        x += ele.price * ele.quantity
      })

      x = x + '.00'

      return x
    },

    sum_goods(data) {
      let x = 0
      data.shopCartData.forEach(ele => {
        x += ele.quantity
      })
      return x
    },
  },

  hideNote() {
    this.setData({
      shownote: false,
      noteValue: ''
    })
  },
  showNote() {
    this.setData({
      shownote: true
    })
  },

  submitnote() {
    this.setData({
      shownote: false,
    })
  },


  fillTimeArray() {
    let date = new Date()
    let hour = date.getHours()
    let min = date.getMinutes()
    let closeHour = Number(this.data.storeCloseTime.slice(0, 2))
    let closeMin = Number(this.data.storeCloseTime.slice(3, 5))
    console.log(closeHour,
      closeMin);
    min -= min % 5
    min += 5
    let x = true
    let datestr = ''
    let count = 0
    while (x) {
      let strmin = String(min + 100).slice(1, 3)
      datestr = hour + ':' + strmin
      min += 5
      this.setData({
        timeArray: [...this.data.timeArray, datestr]
      })
      if (min == 60) {
        min = 0
        hour++
      }
      if (hour >= closeHour) {
        if (min == closeMin) {

          x = false
        }
      }
      count++
      if (count === 200) {
        x = false
      }

    }
    this.setData({
      timeArray: ['立刻取餐', ...this.data.timeArray]
    })
  },

  toggleFlot() {
    this.setData({
      goods_flot: !this.data.goods_flot
    })
  },

  payBtnEvent() {
    let self = this
    this.createrOrderId()
    this.setData({
      allNum: 0,
      allQuantity: 0
    })
    this.data.shopCartData.forEach(ele => {
      this.setData({
        allNum: this.data.allNum + ele.price * ele.quantity
      })
    })
    this.data.shopCartData.forEach(ele => {
      this.setData({
        allQuantity: this.data.allQuantity + ele.quantity
      })
    })
    let orderdata = {
      shopCartData: this.data.shopCartData, //购物车
      storeAddress: this.data.storeAddress, //商家地址
      storeDetilAddress: this.data.storeDetilAddress, //商家详细地址
      storeDistance: this.data.storeDistance, //店铺距离
      orderState: "进行中",
      orderId: this.data.orderId,
      getFoodTime: this.data.choseTime,
      noteValue: this.data.noteValue,
      allNum: this.data.allNum,
      allQuantity: this.data.allQuantity
    }

    wx.showModal({
      title: '支付出错',
      content: '您是否确认支付？',
      success(res) {
        if (res.confirm) {
          db.collection('index_user_orders').add({
            // name:'index_user_message',
            data: {
              ...orderdata,
              titleText: 'manufacture',
              temperStatus: 'manufacture',
            },
            success: () => {
              wx.navigateTo({
                url: '/pages/orderChildren/orderChildren',
                success: (res) => {
                  console.log(self.data.shopCartData, 123567);

                  res.eventChannel.emit('inspectPageData', {
                    data: {
                      ...orderdata,
                      titleText: 'manufacture',
                      temperStatus: 'manufacture',
                    }
                  })
                }
              })

            }

          });


        } else if (res.cancel) {
          db.collection('index_user_orders').add({
            // name:'index_user_message',
            data: {
              ...orderdata,
              titleText: 'ongoing',
              temperStatus: '',
            },
            success: () => {
              wx.navigateTo({
                url: '/pages/orderChildren/orderChildren',
                success: (res) => {
                  console.log(self.data.shopCartData, 123567);

                  res.eventChannel.emit('inspectPageData', {
                    data: {
                      ...orderdata,
                      titleText: 'ongoing',
                      temperStatus: '',
                    }
                  })
                }
              })

            }

          });

        }
      }
    })


  },



  bindPickerChange: function (e) {
    this.setData({
      choseTime: this.data.timeArray[e.detail.value]
    })
  },

  createrOrderId() {
    let date = new Date
    let x = 'test' + date.valueOf()
    this.setData({
      orderId: x
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {

    //获取通信通道
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', ({
      data
    }) => {
      //对发送过来的数据进行处理
      this.setData({
        shopCartData: data.shopCartData,
        storeAddress: data.storeAddress,
        storeDetilAddress: data.storeDetilAddress,
      })
    })

    this.createrOrderId()
    this.fillTimeArray()
  },
  /**
   * 生命周期函数--监听页面初次渲染完
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})