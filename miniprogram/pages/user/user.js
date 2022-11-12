// pages/user/user.js
const db = wx.cloud.database()
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userdata: {},
    list: [{
        title: "兑换码",
        icon: "cloud://cloud1-2g9ol1w699eb1c84.636c-cloud1-2g9ol1w699eb1c84-1314595113/user-images/icon_setting_code.png",
      },
      {
        title: "隐私政策",
        icon: "cloud://cloud1-2g9ol1w699eb1c84.636c-cloud1-2g9ol1w699eb1c84-1314595113/user-images/yinsi.png",
      },
      {
        title: "用户服务协议",
        icon: "cloud://cloud1-2g9ol1w699eb1c84.636c-cloud1-2g9ol1w699eb1c84-1314595113/user-images/xieyi.png",
      },
      {
        title: "经营信息公示",
        icon: "cloud://cloud1-2g9ol1w699eb1c84.636c-cloud1-2g9ol1w699eb1c84-1314595113/user-images/xinxi.png",
      },
    ],
    bgColor: [{
        top: "#ffe5e4",
        bottom: "#f6f6f6",
        left: "#fb6e87",
        right: "#ff95bd",
      },
      {
        top: "#dbf1fe",
        bottom: "#f7ffff",
        left: "#60a9ed",
        right: "#7dc9fb",
      },
      {
        top: "#fefdf9",
        bottom: "#fefdf9",
        left: "#f2c04d",
        right: "#fed47e",
      },
      {
        top: "#e7e7e7",
        bottom: "#f9f9f7",
        left: "#484848",
        right: "#494949",
      }
    ],
    levelType: [{
        vipName: "小雪球",
        totalSweet: 100,
        desc: "再升1级可享【攒币加速】等8项权益",
        icon: `cloud://cloud1-2g9ol1w699eb1c84.636c-cloud1-2g9ol1w699eb1c84-1314595113/user-images/icon_level_figure_2.png`,
      },
      {
        vipName: "大雪人",
        totalSweet: 1000,
        desc: "再升1级可享【攒币加速】等9项权益",
        icon: `cloud://cloud1-2g9ol1w699eb1c84.636c-cloud1-2g9ol1w699eb1c84-1314595113/user-images/icon_level_figure_3.png`
      },
      {
        vipName: "冰雪王",
        totalSweet: 2000,
        desc: "您已经是冰雪王啦",
        icon: `cloud://cloud1-2g9ol1w699eb1c84.636c-cloud1-2g9ol1w699eb1c84-1314595113/user-images/icon_level_figure_4.png`
      }
    ]
  },

  add() {
    db.collection('userData').doc('a07d70686368f4960040c3ed33e2610d').update({
      data: {
        currentSweet: _.inc(10),
      },
      success: res => {
        console.log(res)
        this.levelUserData()
      }
    })
  },

  levelUserData() {
    db.collection('userData').get({
      success: res => {
        console.log(res.data[0])
        this.setData({
          userdata: res.data[0]
        })
        if (this.data.userdata.currentSweet == this.data.userdata.totalSweet) {
          let levelIndex = this.data.userdata.level - 1
          console.log(levelIndex)
          db.collection('userData').doc('a07d70686368f4960040c3ed33e2610d').update({
            data: {
              vipName: this.data.levelType[levelIndex].vipName,
              level: _.inc(1),
              desc: this.data.levelType[levelIndex].desc,
              icon: this.data.levelType[levelIndex].icon,
              totalSweet: this.data.levelType[levelIndex].totalSweet,
            },
            success: res => {
              console.log(res)
              this.getUserData()
            }
          })
        }
      }
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

  updateUserData() {
    db.collection('userData').get({
      success: res => {
        console.log(res.data[0])
        this.setData({
          userdata: res.data[0]
        })
        let y1 = new Date(this.data.userdata.signTime).getFullYear()
        let m1 = new Date(this.data.userdata.signTime).getMonth()
        let d1 = new Date(this.data.userdata.signTime).getDate()
        let y2 = new Date().getFullYear()
        let m2 = new Date().getMonth()
        let d2 = new Date().getDate()
        if (y2 >= y1 && m2 >= m1 && d2 > d1) {
          db.collection('userData').doc('a07d70686368f4960040c3ed33e2610d').update({
            data: {
              sign: false,
            },
            success: res => {
              console.log(res)
              this.getUserData()
            }
          })
        }
      }
    })
  },

  sign() {
    db.collection('userData').doc('a07d70686368f4960040c3ed33e2610d').update({
      data: {
        coin: _.inc(5),
        sign: true,
        signTime: new Date().toLocaleDateString()
      },
      success: res => {
        console.log(res)
        this.getUserData()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.updateUserData()
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