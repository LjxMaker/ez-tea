const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renderData: {},
    num: 60,
    count: 29,
    cancel: false,
    judgeStatus: true,
    timer: null,
    showText: '待支付'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.CountDownTime();
    let self = this;
    let IndexEventChannel = this.getOpenerEventChannel();
    IndexEventChannel.on('deliveryPageData', function (data) {
      console.log(data);
      let message = data.data;

      let shopcart = message.shopCartData;
      let arr = [];
      for (let i = 0; i < shopcart.length; i++) {
        let finds = arr.findIndex(it => it.id == shopcart[i].id);
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
    db.collection('index_user_orders').doc(`${this.data.renderData._id}`).update({
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
    console.log('sald',this.data.renderData._id)
    db.collection('index_user_orders').doc(`${this.data.renderData._id}`).update({
      data: {
        orderState: '历史',
        temperStatus: 'competedPay'
      }
    });
    clearInterval(this.data.timer)
    this.setData({
      cancel: true,
      showText: '已支付'
    })
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