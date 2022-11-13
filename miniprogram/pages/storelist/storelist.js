// pages/storelist/storelist.js
var app = getApp();

var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

import storeListData from '../../data/store'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    flodMap: false,
    storeList: [],
    showPopup: false,
    choseStore: {},
    markers: [{
      iconPath: "../../icons/icon_shop_normal.png",
      longitude: 121.45088,
      latitude: 31.25145,
      id: 0,
      width: 33,
      height: 40.5
    }]
  },

  selectStore(e) {
    console.log(e);
    this.setData({
      showPopup: true,
      choseStore: e.currentTarget.dataset.store
    });

    console.log(this.data.choseStore);
  },

  jumpTakeOrder() {
    wx.navigateTo({
      url: '../takeorder/takeorder',
      success: (res) => {
        res.eventChannel.emit('pushstoredata', {
          data: {
            storeAddress: this.data.choseStore.storeAddress,
            storeDetilAddress: this.data.choseStore.storeDetilAddress,
            storeDistance: this.data.choseStore.storeDistance,
            storeBusinessHoursOpen: this.data.choseStore.storeBusinessHoursOpen,
            storeBusinessHoursClose: this.data.choseStore.storeBusinessHoursClose
          }
        })
      }
    })
  },

  onClosePopup() {
    this.setData({
      showPopup: false
    });
  },

  clickflodMap() {
    this.setData({
      flodMap: !this.data.flodMap
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'GBZBZ-V4O6R-UZDWF-WAU6S-X2L7K-HQB2P'
    });

    this.setData({
      storeList: storeListData.store_list
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
  onShow: function () {
    // 调用接口

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