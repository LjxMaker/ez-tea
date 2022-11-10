// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renderUserMessage:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  getUserMessageData(){
    wx.cloud.database().collection('index_user_message').get().then(res=>{
      this.setData({
        renderUserMessage:res.data
      })
    }).catch(err=>{
      console.log('请求数据失败',err);
    })
  },
  reEditMessage(e){
    wx.navigateTo({
      url: '/pages/indexOtherPages/indexBuildAddress/indexBuildAddress',
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptMyAddresseData', {
          data: e.currentTarget.dataset.usermessage
        })
      }
    })
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
    this.getUserMessageData();
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