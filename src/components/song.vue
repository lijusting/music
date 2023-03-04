<template>
  <div>
    <audio
      @timeupdate="onTimeupdata()"
      @loadedmetadata="onLoadedmetadata()"
      @ended="ended()"
      :src="songdetai.link"
      ref="audio"
    ></audio>
    <Cartoon :url="songdetai.cover"></Cartoon>
    <Time></Time>
    <Progress @changeCurrentTime="changeCurrentTime()"> </Progress>
    <Button></Button>
  </div>
</template>

<script>
import Cartoon from "./song/cartoon.vue";
import Progress from "./song/progress.vue";
import Time from "./song/time.vue";
import Button from "./song/muisc-button.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  components: { Cartoon, Progress, Time, Button },
  data() {
    return {
      songdetai: { 1: 2 },
    };
  },
  mounted() {
    axios
      .get("https://api.paugram.com/netease", {
        params: {
          id: this.$store.state.song.songlist[
            this.$store.state.song.currentIndex
          ][1],
        },
      })
      .then((res) => {
        this.songdetai = res.data;
        console.log(this.songdetai);
        this.setLyc(res.data.lyric);
      });
  },
  computed: {
    ...mapState("song", [
      "songlist",
      "currentIndex",
      "currentTime",
      "playing",
      "totalTime",
    ]),
  },
  methods: {
    ...mapActions([
      "song/setCurrentTime",
      "song/toSwitch",
      "song/setTotalTime",
      "song/playNext",
      "song/setLyc",
    ]),
    ...mapMutations("song", [
      "setCurrentTime",
      "toSwitch",
      "setTotalTime",
      "playNext",
      "setLyc",
    ]),
    onLoadedmetadata() {
      this.setTotalTime(this.$refs.audio.duration);
      console.log(this.$refs.audio.duration);
      this.$refs.audio.play();
    },
    onTimeupdata() {
      this.setCurrentTime(this.$refs.audio.currentTime);
    },
    changeCurrentTime() {
      this.$refs.audio.currentTime = this.$store.state.song.currentTime;
    },
    ended() {
      this.playNext();
    },
  },
  watch: {
    "$store.state.song.playing"() {
      if (this.$store.state.song.playing == true) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    "$store.state.song.currentIndex"() {
      axios
        .get("https://api.paugram.com/netease", {
          params: {
            id: this.$store.state.song.songlist[
              this.$store.state.song.currentIndex
            ][1],
          },
        })
        .then((res) => {
          console.log(res.data);
          this.songdetai = res.data;
          this.setLyc(res.data.lyric);
          console.log("点击下一首" + res.data.lyric);
        });
    },
  },
};
</script>

<style>
</style>