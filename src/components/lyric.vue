<template>
  <div>
    <div class="lyc" ref="lyricContainer">
      <ul ref="lyricList" class="lyricUL">
        <li
          v-for="(item, i) in lyricsObjArr"
          :style="{ color: lyricIndex === i ? '#d33a31' : '#000' }"
          :class="lyricIndex === i ? 'active1' : ''"
          :key="item.uid"
          :data-index="i"
          ref="lyric"
        >
          {{ item.lyric }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { formatLyric } from "../utils/formatLyric";
export default {
  computed: {
    ...mapState("song", ["lyc"]),
  },
  data() {
    return {
      lyricIndex: -1,
      lyricsObjArr: "",
    };
  },
  methods: {
    //设置lyric高亮下标
    setLyricIndex(lyricsObjArr) {
      for (let i = 0; i < lyricsObjArr.length; i++) {
        if (
          this.$store.state.song.currentTime > parseInt(lyricsObjArr[i].time)
        ) {
          const index = this.$refs.lyric[i].dataset.index;
          if (i === parseInt(index)) {
            this.lyricIndex = i;
          }
        }
      }
    },
    highlightLyric(currentIndex) {
      const listHight = this.$refs.lyric[0].offsetHeight;
      console.log("元素高度" + this.$refs.lyric[0].offsetHeight);
      if (currentIndex > 12) {
        console.log(currentIndex);
        console.log(listHight);
        console.log("li:" + this.$refs.lyric[0].offsetHeight);

        this.$refs.lyricList.style.top = `${
          -listHight * (currentIndex - 12)
        }px`;
      }
    },
  },
  mounted() {
    this.lyricsObjArr = formatLyric(this.$store.state.song.lyc);
  },
  watch: {
    "$store.state.song.currentTime"() {
      console.log("我在移动");
      this.setLyricIndex(this.lyricsObjArr);
    },
    "$store.state.song.lyc"() {
      console.log("这是歌词板块里的歌词");
      this.lyricsObjArr = formatLyric(this.$store.state.song.lyc);
      console.log(this.lyricsObjArr);
    },
    lyricIndex() {
      console.log("GAO LIANG");
      this.highlightLyric(this.lyricIndex);
    },
  },
};

import "../assets/css/lyric.scss";
</script>

<style>
</style>