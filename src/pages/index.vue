<template>
  <div>
    <div class="user-profile">
      <div class="avatar">
        <img :src="avatarUrl" alt="Avatar" />
      </div>
      <div class="nickname">{{ nickname }}</div>
      <div></div>
    </div>

    <el-row :gutter="10">
      <el-col
        @click="jumpSonglist(i[0])"
        v-for="i in playlist"
        :key="i.key"
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        :xl="11"
      >
        <Playlist :coverImgurl="i[2]" :id="i[0]" :name="i[1]"></Playlist>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import Playlist from "./playlist.vue";
export default {
  components: {
    Playlist,
  },
  data() {
    return {
      nickname: "",
      avatarUrl: "",
      playlist: { 1: 12 },
    };
  },
  methods: {},
  created() {
    axios
      .get(
        `https://netease-cloud-music-api-beta-lyart.vercel.app/login/status?cookie=${sessionStorage.getItem(
          "cookie"
        )}`
      )

      .then((res) => {
        console.log(res);
        // console.log(res.data.data.account.id,res.data.data.account.status);
        // console.log(res.data.data.profile.avatarUrl,res.data.data.profile.nickname)
        sessionStorage.setItem("userid", res.data.data.account.id);
        sessionStorage.setItem("avatarUrl", res.data.data.profile.avatarUrl);
        sessionStorage.setItem("nickname", res.data.data.profile.nickname);
        // console.log( sessionStorage.getItem('isLogin'));
        console.log(sessionStorage.getItem("nickname"));
      })
      .then(() => {
        this.uid = sessionStorage.getItem("userid");
        this.avatarUrl = sessionStorage.getItem("avatarUrl");
        this.nickname = sessionStorage.getItem("nickname");
      })
      .then(() => {
        axios
          .get(
            "https://netease-cloud-music-api-beta-lyart.vercel.app/user/playlist",
            {
              params: {
                cookie: sessionStorage.getItem("cookie"),
                uid: sessionStorage.getItem("userid"),
              },
            }
          )
          .then((res) => {
            console.log(res);
            for (let i in res.data.playlist) {
              let temp = [];
              console.log(i);
              temp.push(
                res.data.playlist[i].id,
                res.data.playlist[i].name,
                res.data.playlist[i].coverImgUrl
              );
              this.playlist[i] = temp;
            }
            console.log(this.playlist);
          });
      });
  },
};
</script>

<style lang="scss">
.user-profile {
  text-align: center;

  .avatar {
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    height: 100px;
    margin-bottom: 10px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .nickname {
    font-size: 20px;
  }
}
</style>