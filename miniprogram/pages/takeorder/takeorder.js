// pages/takeorder/takeorder.js
import goodsData from '../../data/goods'
const computedBehavior = require("miniprogram-computed").behavior
let app = getApp();
Page({
  behaviors: [computedBehavior],
  //右侧分类的高度累加数
  heightArr: [],
  //记录scroll-view滚动过程中距离顶部的高度
  distance: 0,
  /**
   * 页面的初始数据
   */
  data: {
    currentLeft: 0, //左侧选中的下标
    selectId: "item0", //当前显示的元素id
    scrollTop: 0, //到顶部的距离
    serviceTypes: goodsData, //项目列表数据
    staffList: [],
    coupons: [],
    statusBarHeight: app.globalData.statusBarHeight,
    countNum: 0,
    shopCartData: [],
    goodsTypeChose: false,
    popupGoodsData: {},
    choseSuger: 0,
    choseTemp: 0,
    choseId: 0,
    shopCartPopup: false,
    storeAddress: '蜜雪冰城(易神工业园店)',
    storeDetilAddress: '广州天河路114号',
    storeDistance: '114m',
    storeBusinessHoursOpen: "0930",
    storeBusinessHoursClose: "2200",
    
  },

  computed: {

    popupgoods_num(data) {
      let goods_index = data.shopCartData.findIndex(ele =>
        ele.cookId == data.choseId
      )
      let sugar_index = data.shopCartData.findIndex((ele) =>
        ele.sugarType === data.choseSuger
      )
      let temp_index = data.shopCartData.findIndex((ele) =>
        ele.tempType === data.choseTemp
      )

      if (goods_index === -1 && sugar_index === -1 && temp_index === -1) {
        return 0
      } else {

        let arr = data.shopCartData.filter((ele) =>
          ele.cookId === data.choseId && ele.sugarType === data.choseSuger && ele.tempType === data.choseTemp
        );

        let x = 0

        arr.forEach(ele => {
          x += ele.quantity
        })

        return x
      }

    },

    sum_price(data) {
      let x = 0
      data.shopCartData.forEach(ele => {
        x += ele.price * ele.quantity
      })

      x = x * 100

      return x
    },

    sum_goods(data) {
      let x = 0
      data.shopCartData.forEach(ele => {
        x += ele.quantity
      })
      return x
    },

    submitDisabled(data) {
      return data.shopCartData === [] ? true : false
    }
  },

  shopCartPopupShow() {
    this.setData({
      shopCartPopup: true
    });
  },

  shopCartPopupClose() {
    this.setData({
      shopCartPopup: false
    });
  },



  //
  backBtn() {
    wx.navigateBack({ //跳转到前一个页面
      success: function () {
        //调用前一个页面的方法
      }
    })
  },



  choseSugerEvent(e) {

    this.setData({
      choseSuger: e.target.dataset.sugerindex
    })
  },
  choseTempEvent(e) {
    this.setData({
      choseTemp: e.target.dataset.tampindex
    })
  },

  shopCartAddGoodEvent(e) {
    console.log(e.detail);

    this.setData({
      shopCartData: this.data.shopCartData.map(ele => {
        if (ele.cookId === e.detail.cookId && ele.sugarType === e.detail.sugarType && ele.tempType === e.detail.tempType) {
          console.log(123123);
          ele.quantity = ele.quantity + 1
        }
        return ele
      })
    })
  },
  shopCartCutGoodEvent(e) {
    this.setData({
      shopCartData: this.data.shopCartData.map(ele => {
        if (ele.cookId === e.detail.cookId && ele.sugarType === e.detail.sugarType && ele.tempType === e.detail.tempType) {
          ele.quantity = ele.quantity - 1
        }
        return ele
      })
    })


    this.setData({
      shopCartData: this.data.shopCartData.filter(ele => ele.quantity !== 0)
    })

  },

  //添加商品方法
  addGoodEvent(e) {
    //查找商品是否存在
    this.setData({
      goodsTypeChose: true,
      popupGoodsData: {
        ...e.detail,
        sugarType: 0,
        tempType: 0
      },
      choseId: e.detail.cookId,
      choseSuger: 0,
      choseTemp: 0,
    })
  },
  cutGoodEvent(e) {
    console.log(e);
    //查找商品是否存在
    this.data.shopCartData.findIndex(ele => ele.cookId === e.cookId)
  },

  popupAddGoods() {
    //检查是否存在该商品
    let goods_index = this.data.shopCartData.findIndex(ele => ele.cookId === this.data.popupGoodsData.cookId && ele.sugarType === this.data.choseSuger && ele.tempType === this.data.choseTemp)


    if (goods_index === -1) {
      this.setData({
        shopCartData: [
          ...this.data.shopCartData,
          {
            ...this.data.popupGoodsData,
            sugarType: this.data.choseSuger,
            tempType: this.data.choseTemp,
            quantity: 1
          }
        ]
      })
    } else {

      this.setData({
        shopCartData: this.data.shopCartData.map(ele => {
          if (ele.cookId === this.data.popupGoodsData.cookId && ele.sugarType === this.data.choseSuger && ele.tempType === this.data.choseTemp) {
            ele.quantity = ele.quantity + 1
          }
          return ele
        })
      })
    }


  },

  popupCutGoods() {
    this.setData({
      shopCartData: this.data.shopCartData.map(ele => {
        if (ele.cookId === this.data.popupGoodsData.cookId && ele.sugarType === this.data.choseSuger && ele.tempType === this.data.choseTemp) {
          ele.quantity = ele.quantity - 1
        }
        return ele
      })
    })
  },

  onClose() {
    this.setData({
      goodsTypeChose: false
    });
  },

  clearBtn() {
    this.setData({
      shopCartData: []
    })
  },

  submitOrder(e) {
    if (this.data.shopCartData == '') {
      console.log('in');
      wx.showToast({
        title: '还什么都没点呢！',
        icon: 'none',
        duration: 2000 //持续的时间
      })

      return
    }

    let self = this
    wx.navigateTo({
      url: "../submitorder/submitorder",

      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: {
            shopCartData: self.data.shopCartData,
            storeAddress: self.data.storeAddress,
            storeDetilAddress: self.data.storeDetilAddress,
            storeDistance: self.data.storeDistance,
            storeBusinessHoursOpen: self.data.storeBusinessHoursOpen,
            storeBusinessHoursClose: self.data.storeBusinessHoursClose
          }
        })
      },
    })


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取通信通道
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('pushstoredata', ({
      data
    }) => {
      //对发送过来的数据进行处理
      console.log(data,312312839);
      this.setData({
        storeAddress: data.storeAddress,
        storeDetilAddress: data.storeDetilAddress,
        storeDistance: data.storeDistance,
        storeBusinessHoursOpen: data.storeBusinessHoursOpen,
        storeBusinessHoursClose: data.storeBusinessHoursClose
      })
    })

    this.selectHeight();
  },

  proItemTap(e) {
    this.setData({
      currentLeft: e.currentTarget.dataset.pos,
      selectId: "item" + e.currentTarget.dataset.pos
    })
  },

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


  scrollEvent(event) {
    if (this.heightArr.length == 0) {
      return;
    }
    let scrollTop = event.detail.scrollTop;
    let current = this.data.currentLeft;
    if (scrollTop >= this.distance) {
      if (current + 1 < this.heightArr.length && scrollTop >= this.heightArr[current]) {
        this.setData({
          currentLeft: current + 1
        })
      }
    } else {
      if (current - 1 >= 0 && scrollTop < this.heightArr[current - 1]) {
        this.setData({
          currentLeft: current - 1
        })
      }
    }

    this.distance = scrollTop;
  }
})