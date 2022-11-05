// pages/takeorder/takeorder.js
import goodsData from '../../data/goods'

var app = getApp();
Page({
  //右侧分类的高度累加数组
  //比如：[洗车数组的高度，洗车+汽车美容的高度，洗车+汽车美容+精品的高度，...]
  heightArr: [],
  //记录scroll-view滚动过程中距离顶部的高度
  distance: 0,

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //选择项目、选择技师、优惠券
    currentLeft: 0, //左侧选中的下标
    selectId: "item0", //当前显示的元素id
    scrollTop: 0, //到顶部的距离
    serviceTypes: goodsData, //项目列表数据
    staffList: [],
    coupons: [],
    statusBarHeight: app.globalData.statusBarHeight,
    pricecount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar()
    this.request();
  },

  //请求列表数据
  request() {

    this.selectHeight();

  },

  //选择项目左侧点击事件 currentLeft：控制左侧选中样式  selectId：设置右侧应显示在顶部的id
  proItemTap(e) {
    this.setData({
      currentLeft: e.currentTarget.dataset.pos,
      selectId: "item" + e.currentTarget.dataset.pos
    })
  },

  //计算右侧每一个分类的高度，在数据请求成功后请求即可
  selectHeight() {
    let that = this;
    this.heightArr = [];
    let h = 0;
    const query = wx.createSelectorQuery();
    query.selectAll('.pro-box').boundingClientRect()
    query.exec(function (res) {
      res[0].forEach((item) => {
        h += item.height;
        that.heightArr.push(h);
      })

    })
  },

  //监听scroll-view的滚动事件
  scrollEvent(event) {
    if (this.heightArr.length == 0) {
      return;
    }
    let scrollTop = event.detail.scrollTop;
    let current = this.data.currentLeft;
    if (scrollTop >= this.distance) { //页面向上滑动
      //如果右侧当前可视区域最底部到顶部的距离 超过 当前列表选中项距顶部的高度（且没有下标越界），则更新左侧选中项
      if (current + 1 < this.heightArr.length && scrollTop >= this.heightArr[current]) {
        this.setData({
          currentLeft: current + 1
        })
      }
    } else { //页面向下滑动
      //如果右侧当前可视区域最顶部到顶部的距离 小于 当前列表选中的项距顶部的高度，则更新左侧选中项
      if (current - 1 >= 0 && scrollTop < this.heightArr[current - 1]) {
        this.setData({
          currentLeft: current - 1
        })
      }
    }
    //更新到顶部的距离
    this.distance = scrollTop;
  }
})