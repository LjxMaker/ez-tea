// pages/index/index.js
const db = wx.cloud.database()
Page({
  data: {
    headerSwiperUrl: [
      "https://img-blog.csdnimg.cn/5589ae9720df44fda0967faaa288a553.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16",
      "https://img-blog.csdnimg.cn/5580029c6bed471487fe93983088cbae.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16",
      "https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16"
    ],
    userdata: {}
  },
  jumpUserPage() {
    wx.switchTab({
      url: "/pages/user/user"
    })
  },
  jumpDetailPage(e) {
    wx.navigateTo({
      url: "/pages/indexOtherPages/indexDetailPage/indexDetailPage",
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptOpenerPageData', {
          data: e.target.dataset.text
        })
      }
    })
  },
  jumpExchangePage() {
    wx.navigateTo({
      url: '/pages/indexOtherPages/indexExchangePage/indexExchangePage'
    })
  },

  getUserData() {
    db.collection('userData').get({
      success: res => {
        console.log(res.data[0])
        this.setData({
          userdata: res.data[0]
        })
      }
    })
  },

  jumpTakeFoodsPage() {
    wx.switchTab({
      url: '/pages/storelist/storelist',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getUserData()
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