Page({

  data: {
    titleText: [{
        text: '进行中',
        type: 'ongoing'
      },
      {
        text: '历史',
        type: 'history'
      },
      {
        text: '退单',
        type: 'chargeback'
      },
    ],
    OngoingMessage: [],
    HistoryRecord: [],
    ChargeBackList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  jumpCurrentPage() {
    wx.switchTab({
      url: '/pages/storelist/storelist',
    })
  },
  getOrderMessageDate() {
    this.setData({
      OngoingMessage: [],
      HistoryRecord: [],
      ChargeBackList: []
    })
    wx.cloud.database().collection('index_user_orders').get().then(res => {
      let CurrentData = res.data;
      let self = this.data;
      CurrentData.forEach(it => {
        let cur = it.shopCartData;
        let allNum = 0;
        let allQuantity = 0;
        let Ctime = this.dealOngoingTime(it.orderId);
        cur.forEach(el => {
          allNum = allNum + (el.price * el.quantity);
          allQuantity = allQuantity + el.quantity;
        });
        it = {
          ...it,
          allNum,
          Ctime,
          allQuantity
        }
        if (it.orderState == '进行中') {
          this.setData({
            OngoingMessage: [...self.OngoingMessage, it]
          })
        } else {
          if (it.orderState == '退单') {
            this.setData({
              ChargeBackList: [...self.ChargeBackList, it]
            })
          }
          this.setData({
            HistoryRecord: [...self.HistoryRecord, {
              ...it,
              allNum
            }]
          })
        }
        // console.log(CurrentData)
      })
    }).catch(err => {
      console.log('请求数据失败', err);
    })
  },
  dealOngoingTime(stTime) {
    let date = new Date(Number(stTime.slice(4)));
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    let time = year + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
    return time;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getOrderMessageDate();
  }
})