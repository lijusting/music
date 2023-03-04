<template>
  <div>
    <ul class="song-list">
      <li v-for="i in songlist" :key="i[0]" @click="listen(i[0])">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="11">
          <div class="song-info">
            <img :src="i[3]" alt="song cover" class="song-cover" />
            <div class="song-details">
              <h3 class="song-title">{{ i[2] }}</h3>
              <p class="song-artist">{{ i[4] }}</p>
            </div>
          </div>
        </el-col>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("song", ["setSonglist", "setCurrentIndex"]),
    ...mapMutations("song", ["setSonglist", "setCurrentIndex"]),
    listen(index) {
      this.$router.push({ path: "/play" });
      this.setCurrentIndex(index);
    },
  },
  mounted() {
    axios
      .get(
        "https://netease-cloud-music-api-beta-lyart.vercel.app/playlist/track/all",
        {
          params: {
            id: this.$route.query.id,
          },
        }
      )
      .then((res) => {
        console.log(res.data.songs);
        console.log(res.data.songs[0].id);
        let arr = [];
        for (let i in res.data.songs) {
          let temp = [];

          temp.push(
            i,
            res.data.songs[i].id,
            res.data.songs[i].name,
            res.data.songs[i].al.picUrl,
            res.data.songs[i].ar[0].name
          );
          arr.push(temp);
        }
        console.log(arr);
        this.setSonglist(arr);
      });
  },
  computed: {
    ...mapState("song", ["songlist"]),
  },
};
import "../assets/css/song-list.scss";
</script>

<style lang="scss">
</style>
