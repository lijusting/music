<template>
  <div class="box">
    <img
      :src="qrimgs"
      ref=" qrcode"
      alt=""
      style="width: 200px; height: 200px"
    />
    <p>扫码登录</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      QRIMG: "qrimg",
      key: "", //key
      qrurl: "",
      qrimgs: "", //二维码图片
      isLogin: false,
    };
  },
  mounted() {
    this.getKey();
  },
  methods: {
    getKey() {
      console.log("wo zhixing le");
      axios
        .get(
          "https://netease-cloud-music-api-beta-lyart.vercel.app/login/qr/key",
          {
            params: {
              timerstamp: new Date().getTime(),
            },
          }
        )
        .then((res) => {
          this.key = res.data.data.unikey;
          this.getQr(res.data.data.unikey);
        });
    },

    getQr(key) {
      console.log("我要获取二维码了");
      let qrData = axios
        .get(
          "https://netease-cloud-music-api-beta-lyart.vercel.app/login/qr/create",
          {
            params: {
              timerstamp: new Date().getTime(), //传入参数时间
              key: this.key,
              qrimg: this.QRIMG,
            },
          }
        )
        .then((res) => {
          console.log("我获取到了二维码,将要进行二维码轮询");
          console.log(res.data.data);
          this.qrurl = res.data.data.qrurl;
          this.qrimgs = res.data.data.qrimg;
          this.onScan();
        });
    },
    //获取二维码的状态
    qrCheck() {
      console.log("轮询中");
      axios
        .get(
          "https://netease-cloud-music-api-beta-lyart.vercel.app/login/qr/check",
          {
            params: {
              key: this.key,
              timerstamp: new Date().getTime(), //传入参数时间戳
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 803) {
            this.isLogin = true;
            console.log("登录成功");
            this.stopScan();
            sessionStorage.setItem("cookie", res.data.cookie);
            this.$router.push({
              path: `/index/`,
            });

            return;
          } else if (res.data.code === 801 || 802) {
            this.onScan();
          } else if (res.data.code === 800) {
            console.log("请刷新");
          } else {
            return;
          }
        });
    },
    onScan() {
      if (this.isLogin === false) {
        console.log("我执行了" + this.isLogin);
        setTimeout(() => {
          this.qrCheck();
        }, 1000);
      }
    },
    stopScan() {
      this.isLogin = true;
    },
    //获取登录之后的状态
    getStatus() {
      let getStatus = axios
        .get(
          `https://netease-cloud-music-api-beta-lyart.vercel.app/login/status?cookie=${sessionStorage.getItem(
            "cookie"
          )}`,
          {}
        )
        .then((res) => {
          sessionStorage.getItem("cookie");

          // console.log(res.data.data.account.id,res.data.data.account.status);
          // console.log(res.data.data.profile.avatarUrl,res.data.data.profile.nickname);

          sessionStorage.setItem("isLogin", res.data.data.account.status);
          sessionStorage.setItem("userid", res.data.data.account.id);
          sessionStorage.setItem("avatarUrl", res.data.data.profile.avatarUrl);
          sessionStorage.setItem("nickname", res.data.data.profile.nickname);
          console.log(666);
          this.$router.push({
            path: `/songlist/`,
          });
          // console.log( sessionStorage.getItem('isLogin'));
          // console.log(sessionStorage.getItem("nickname"));
        });
    },

    //获取用户信息 , 歌单，收藏，mv, dj 数量

    //   getUinfo() {
    //     let getUinfo = axios.get('https://netease-cloud-music-api-beta-lyart.vercel.app/user/detail?uid=32953014', {

    //     }).then(res=>{
    //       console.log('0000000');
    //       console.log(res);
    //     // console.log(res.data.data.code);
    //             })
    // },
  },
};
</script>
<style lang="scss" scoped>
.box {
  display: block;
  margin: auto;
  margin-top: 200px;
  width: 300px;
  position: relative;
  height: 350px;
  background-color: #fff;
  p {
    text-align: center;
  }
}
</style>
