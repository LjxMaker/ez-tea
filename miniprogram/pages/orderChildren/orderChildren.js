const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renderData: {},
    num: 60,
    count: 29,
    cancel: false,
    curValue: false,
    judgeStatus: true,
    chargeStatus: true,
    timer: null,
    showText: '待支付'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    let IndexEventChannel = this.getOpenerEventChannel();
    IndexEventChannel.on('deliveryPageData', function (data) {
      let message = data.data;
      let shopcart = message.shopCartData;
      let arr = [];
      for (let i = 0; i < shopcart.length; i++) {
        let finds = arr.findIndex(it => it.cookId == shopcart[i].cookId);
        if (finds == -1) {
          arr.push(shopcart[i]);
        } else {
          arr[finds] = {
            ...arr[finds],
            quantity: arr[finds].quantity + shopcart[i].quantity
          }
        }
      }
      // console.log('temper===',arr)
      let currentNumber = 0;
      arr.forEach(it => {
        currentNumber = currentNumber + it.quantity;
      });
      self.setData({
        renderData: {
          ...message,
          shopCartData: [...arr],
          currentNumber
        }
      })
    })
    let historyEventChannel = this.getOpenerEventChannel();
    historyEventChannel.on('inspectPageData', function (data) {
      console.log(data);
      let message = data.data;
      let shopcart = message.shopCartData;
      let arr = [];
      for (let i = 0; i < shopcart.length; i++) {
        let finds = arr.findIndex(it => it.cookId == shopcart[i].cookId);
        if (finds == -1) {
          arr.push(shopcart[i]);
        } else {
          arr[finds] = {
            ...arr[finds],
            quantity: arr[finds].quantity + shopcart[i].quantity
          }
        }
      }
      // console.log('temper===',arr)
      let currentNumber = 0;
      arr.forEach(it => {
        currentNumber = currentNumber + it.quantity;
      });
      self.setData({
        renderData: {
          ...message,
          shopCartData: [...arr],
          currentNumber
        }
      })
    })
    let testTitle = this.data.renderData.titleText;
    console.log(testTitle);
    if (testTitle == 'ongoing') {
      this.CountDownTime();
    }
    if (this.data.renderData.temperStatus == 'manufacture') {
      this.setData({
        showText: '制作中...'
      })
    }
  },
  jumpToTakeOrder() {
    wx.navigateTo({
      url: '/pages/takeorder/takeorder',
    })
  },
  CountDownTime() {

    this.data.timer = setInterval(() => {
      if (this.data.num == 0) {
        if (this.data.count != 0) {
          this.setData({
            num: 60,
            count: this.data.count - 1
          })
        } else {
          this.setData({
            cancel: true,
            showText: '已取消支付'
          })
          clearInterval(this.data.timer);
        }
      } else {
        this.setData({
          num: this.data.num - 1
        })
      }
      let a = this.data;
      let minute = a.count;
      let second = a.num;
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      this.setData({
        timeString: minute + ':' + second
      })
    }, 1000);
  },
  cancelCurrentEvent() {
    db.collection('index_user_orders').where({
      orderId: `${this.data.renderData.orderId}`
    }).update({
      data: {
        orderState: '历史',
        temperStatus: 'cancelPay'
      }
    });
    clearInterval(this.data.timer)
    this.setData({
      cancel: true,
      showText: '已取消支付'
    })
  },
  confirmCurrentEvent() {
    // console.log('sald',this.data.renderData._id)
    db.collection('index_user_orders').where({
      orderId: `${this.data.renderData.orderId}`
    }).update({
      data: {
        orderState: '制作中',
        temperStatus: 'manufacture',
      }
    });
    clearInterval(this.data.timer)
    this.setData({
      cancel: true,
      chargeStatus: false,
      showText: '支付成功,等待制作中...',
      renderData: {
        ...this.data.renderData,
        titleText: 'manufacture'
      }
    })
  },
  manufactureCurrentEvent() {
    db.collection('index_user_orders').where({
      orderId: `${this.data.renderData.orderId}`
    }).update({
      data: {
        orderState: '退单',
        temperStatus: 'chargeBack'
      },
      success: function (res) {
        console.log(res);
      }
    })
    clearInterval(this.data.timer)
    this.setData({
      chargeStatus: true,
      showText: '退单成功',
      curValue: true,
      renderData: {
        ...this.data.renderData,
        temperStatus: 'chargeBack'
      }
    })
  },
  immediatelyTakeFood() {
    console.log(this.data.renderData.titleText);
    if (this.data.renderData.titleText == 'manufacture') {
      db.collection('index_user_orders').where({
        orderId: `${this.data.renderData.orderId}`
      }).update({
        data: {
          orderState: '历史',
          temperStatus: 'completedPay'
        }
      });
      clearInterval(this.data.timer)
      this.setData({
        showText: '已成功取餐',
        curValue: true
      })
      db.collection('userData').doc('a07d70686368f4960040c3ed33e2610d').update({
        data: {
          currentSweet: _.inc(this.data.renderData.allNum),
        },
        success: res => {
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '没有取餐订单!',
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})