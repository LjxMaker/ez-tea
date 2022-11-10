// pages/order/order.js
import {SwiperUrl,animateText,orderMessage,selectMessage,swiperMessage} from "./exChangeUtils"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SwiperUrl,
    animateText,
    isRunText:0,
    orderMessage,
    selectMessage,
    swiperMessage
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
console.log(swiperMessage,selectMessage);
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
    let count=1;
    setInterval(()=>{
      if(count>5){
        count=1;
      }
      this.setData({
        isRunText:count,
      })
      count++;
    },6000);
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