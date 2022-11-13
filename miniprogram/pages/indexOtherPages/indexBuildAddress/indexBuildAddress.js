const key = 'VE6BZ-DUSY4-DTTUX-XODM2-UMJOQ-ROFFR'; //使用在腾讯位置服务申请的key
const referer = 'ez-tea'; //调用插件的app的名称
const location = JSON.stringify({
  latitude: 39.89631551,
  longitude: 116.323459711
});
const category = '';
const chooseLocation = requirePlugin('chooseLocation');

const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderData: '先生',
    judgeUserName: false,
    judgeTelephone: false,
    judgeAddress: false,
    tipsText: '输入框不能为空!',
    idStatus: '',
    renderMessage: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let IndexBuildChannel = this.getOpenerEventChannel();
    let self = this;
    IndexBuildChannel.on('acceptMyAddresseData', function (data) {
      let temp = data.data;
      self.setData({
        renderMessage: temp,
        idStatus: 'modify'
      })
    })
  },

  acceptUserName(e) {
    let temperJudge = e.detail.value;
    if (temperJudge != '') {
      this.setData({
        userData: e.detail.value,
        judgeUserName: true,
      })
    }
    this.setData({
      renderMessage: {
        ...this.data.renderMessage,
        userData: e.detail.value
      },
    })


  },
  acceptGenderData(e) {

    this.setData({
      genderData: e.detail.value,
      renderMessage: {
        ...this.data.renderMessage,
        genderData: e.detail.value
      },
    })

  },
  acceptUserTelephone(e) {
    let temperJudge = e.detail.value
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    let res = reg.test(temperJudge);
    if (temperJudge != '' && res) {
      this.setData({
        telephoneData: e.detail.value,
        judgeTelephone: true
      })
    } else {
      this.setData({
        tipsText: '手机号格式有误!'
      })
    }
    this.setData({
      renderMessage: {
        ...this.data.renderMessage,
        telephoneData: e.detail.value
      },
    })
  },
  acceptUserAddress(e) {
    let temperJudge = e.detail.value
    if (temperJudge != '') {
      this.setData({
        addressData: e.detail.value,

        judgeAddress: true
      })
    }
    this.setData({
      renderMessage: {
        ...this.data.renderMessage,
        addressData: e.detail.value
      },
    })
  },
  acceptUserDoorplate(e) {
    this.setData({
      doorplateData: e.detail.value,
      renderMessage: {
        ...this.data.renderMessage,
        doorplateData: e.detail.value
      },
    })
  },
  submitUserMessage() {
    if (this.data.idStatus != "modify") {
      wx.showLoading({
        title: '创建地址中...',
      })
      let temperjudge = this.data
      if (temperjudge.judgeUserName && temperjudge.judgeTelephone && temperjudge.judgeAddress) {
        db.collection('index_user_message').add({
          // name:'index_user_message',
          data: {
            userData: this.data.userData,
            genderData: this.data.genderData,
            telephoneData: this.data.telephoneData,
            addressData: this.data.addressData,
            doorplateData: this.data.doorplateData

          },
          success: () => {
            wx.showToast({
              title: '创建成功',
            });
            this.setData({
              genderData: '先生',
              judgeUserName: false,
              judgeTelephone: false,
              judgeAddress: false,
              tipsText: '输入框不能为空!'
            });
            wx.navigateBack({
              delta: 0,
            })
          }

        });
      } else {
        wx.showToast({
          title: this.data.tipsText,
        })
        this.setData({
          tipsText: '输入框不能为空!'
        })
      }
    } else {
      let cur = this.data.renderMessage
      let judge = this.dealTelephoneStatus({
        tel: cur.telephoneData,
        user: cur.userData,
        address: cur.addressData
      });
      if (judge) {
        db.collection('index_user_message').doc(`${this.data.renderMessage._id}`).update({
          data: {
            userData: this.data.userData,
            genderData: this.data.genderData,
            telephoneData: this.data.telephoneData,
            addressData: this.data.addressData,
            doorplateData: this.data.doorplateData
          }
        });
        this.setData({
          idStatus: '',
          renderMessage: {}
        });
        wx.navigateBack({
          delta: 0,
        });
        wx.showToast({
          title: '修改成功',
        })
      }
    }

  },

  dealTelephoneStatus(obj) {
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    let res = reg.test(obj.tel);
    if (obj.tel != '' && res) {
      if (obj.user == '') {
        wx.showToast({
          title: '联系人不能为空!',
        })
        return false;
      } else {
        if (obj.address == '') {
          wx.showToast({
            title: '地址不能为空!',
          })
          return false;
        } else {
          return true;
        }
      }
    } else {
      wx.showToast({
        title: '手机号格式有误!'
      })
      return false;
    }
  },

  jumpMapSearchPage() {
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
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
    const location = chooseLocation.getLocation();
    if(location){
      // console.log(location.address);
      this.setData({
        addressData:location.address,
        renderMessage: {
          ...this.data.renderMessage,
          addressData: location.address
        },
        judgeAddress: true
      })
    }
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
    chooseLocation.setLocation(null);
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