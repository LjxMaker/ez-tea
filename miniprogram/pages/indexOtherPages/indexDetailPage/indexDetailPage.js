// pages/order/order.js
import {imgUrl,welfareUrl} from './utils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
   switchCount:0,
   welfareUrl,
   renderType:'drink'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.dealTime(new Date());
    let self=this;
    let IndexEventChannel=this.getOpenerEventChannel();
    IndexEventChannel.on('acceptOpenerPageData', function(data) {
      let message=data.data;
      self.setData({
        renderType:message
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  dealTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let week=date.getDay();
    let type=imgUrl[week]
    let weekString=week==0?'周日':week==1?'周一':week==2?'周二':week==3?'周三':week==4?'周四':week=5?'周五':week==6?'周六':'';
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    this.setData({
      timeString:`${year}-${month}-${day} ${hour}:${minutes}`,
      titleTime:`${year}.${month}.${day}`,
      weekString,
      type
    })


  },
  switchPageEvent(){
    this.data.switchCount++;
    let count=this.data.switchCount;
    let date=new Date();
    if(count>=7){
      return;
    }
    date=date.setDate(date.getDate()-count);
    this.dealTime(new Date(date));
    // console.log(this.data.switchCount)
  },
  dateChangeStatus(){
    
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