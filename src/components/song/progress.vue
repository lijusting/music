<template>
  <el-slider
    @change="changeCurrentTime()"
    v-model="value"
    :show-tooltip="false"
  ></el-slider>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: -1,
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["song/setCurrentTime"]),
    ...mapMutations("song", ["setCurrentTime"]),
    changeCurrentTime() {
      this.setCurrentTime(
        (this.value / 100) * this.$store.state.song.totalTime
      );
      console.log("这是更改后的时间" + this.$store.state.song.currentTime);
      this.$emit("changeCurrentTime");
    },
    setValue() {
      this.value =
        (this.$store.state.song.currentTime /
          this.$store.state.song.totalTime) *
        100;
      // console.log(this.value);
    },
  },
  computed: {
    ...mapState("song", ["currentTime"]),
  },
  watch: {
    "$store.state.song.currentTime"() {
      this.setValue();
    },
  },
};
import "../../assets/css/progress.scss";
</script>
<style>
</style>