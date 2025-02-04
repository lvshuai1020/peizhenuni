"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_share2 = common_vendor.resolveComponent("share");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_share2 + _easycom_uni_popup2)();
}
const _easycom_share = () => "../../components/share/share.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_share + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const mine = common_vendor.ref({});
    const statistic = common_vendor.ref({});
    const popup = common_vendor.ref(null);
    const validMobile = common_vendor.ref({
      // 
      validCode: "",
      // 验证码
      phone: ""
      // 手机号
    });
    const countdown = common_vendor.ref({
      validText: "获取验证码",
      time: 60
      // 倒计时
    });
    common_vendor.onMounted(() => {
      getUserInfo();
    });
    const getUserInfo = () => {
      if (!common_vendor.index.getStorageSync("token")) {
        return popup.value.open("center");
      }
      app.globalData.utils.request({
        url: "/User/index",
        method: "GET",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          mine.value = res.data.data.mine;
          statistic.value = res.data.data.statistic;
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.msg
          });
        }
      });
    };
    const toOrders = (filt) => {
      app.globalData.filt = filt;
      common_vendor.index.switchTab({
        url: "../order/index"
      });
    };
    const clone_shareModal = common_vendor.ref(false);
    const showShareModal = () => {
      clone_shareModal.value = !clone_shareModal.value;
    };
    const toServiceManager = () => {
      common_vendor.index.navigateTo({
        url: "../clients/index"
      });
    };
    let flag = false;
    const countdownChange = () => {
      if (!validMobile.value.phone) {
        return common_vendor.index.showToast({
          title: "请输入手机号",
          duration: 1e3,
          icon: "none"
        });
      }
      if (flag)
        return;
      flag = true;
      const timer = setInterval(() => {
        if (countdown.value.time <= 0) {
          countdown.value.validText = "获取验证码";
          countdown.value.time = 60;
          clearInterval(timer);
          flag = false;
        } else {
          countdown.value.time -= 1;
          countdown.value.validText = `剩余${countdown.value.time}S`;
        }
      }, 1e3);
      app.globalData.utils.request({
        url: "/get/code",
        method: "POST",
        data: {
          tel: validMobile.value.phone
          // 手机号
        },
        success: (res) => {
          common_vendor.index.showToast({
            title: "验证码发送成功,请尽快验证!",
            duration: 1e3,
            icon: "none"
          });
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      });
    };
    const cancal = () => {
      popup.value.close();
    };
    const ok = () => {
      if (!validMobile.value.phone || !validMobile.value.validCode) {
        return common_vendor.index.showToast({
          title: "请检查输入信息",
          duration: 1e3,
          icon: "none"
        });
      }
      app.globalData.utils.request({
        url: "/user/authentication",
        method: "POST",
        data: {
          tel: validMobile.value.phone,
          // 手机号
          code: validMobile.value.validCode
          // 验证码
        },
        success: (res) => {
          common_vendor.index.setStorageSync("token", res.data.data.token);
          popup.value.close();
          getUserInfo();
        },
        fail: (res) => {
          popup.value.close();
          common_vendor.index.showToast({
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      });
    };
    function godetail() {
      common_vendor.index.navigateTo({
        url: "/pages/userdetail/index"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: mine.value.avatar
      }, mine.value.avatar ? {
        b: mine.value.avatar_url
      } : {
        c: common_assets._imports_0$3
      }, {
        d: common_vendor.t(mine.value.nickname ? mine.value.nickname : "用户" + mine.value._id),
        e: common_vendor.o(godetail),
        f: common_vendor.o(($event) => toOrders("")),
        g: common_assets._imports_1,
        h: statistic.value.topays > 0
      }, statistic.value.topays > 0 ? {
        i: common_vendor.t(statistic.value.topays)
      } : {}, {
        j: common_vendor.o(($event) => toOrders(1)),
        k: common_assets._imports_2,
        l: statistic.value.todos > 0
      }, statistic.value.todos > 0 ? {
        m: common_vendor.t(statistic.value.todos)
      } : {}, {
        n: common_vendor.o(($event) => toOrders(2)),
        o: common_assets._imports_3,
        p: common_vendor.o(($event) => toOrders(3)),
        q: common_assets._imports_4,
        r: common_vendor.o(($event) => toOrders(4)),
        s: common_assets._imports_5,
        t: common_vendor.o(toServiceManager),
        v: common_assets._imports_6,
        w: common_vendor.o(showShareModal),
        x: common_vendor.p({
          shareModal: clone_shareModal.value
        }),
        y: validMobile.value.phone,
        z: common_vendor.o(($event) => validMobile.value.phone = $event.detail.value),
        A: validMobile.value.validCode,
        B: common_vendor.o(($event) => validMobile.value.validCode = $event.detail.value),
        C: common_vendor.t(countdown.value.validText),
        D: common_vendor.o(countdownChange),
        E: common_vendor.o(cancal),
        F: common_vendor.o(ok),
        G: common_vendor.sr(popup, "5808cdfc-1", {
          "k": "popup"
        }),
        H: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
