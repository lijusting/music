<template>
  <div class="music_button">
    <button @click="toPlayNext()" class="bt">
      <img src="../../assets/svg/previous.svg" alt="" />
    </button>
    <button @click="toSwitch()" class="bt" v-show="!playing">
      <img src="../../assets/svg/play.svg" alt="" />
    </button>

    <button @click="toSwitch()" class="bt" v-show="playing">
      <img src="../../assets/svg/pause.svg" alt="" />
    </button>
    <button @click="toPlayNext()" class="bt">
      <img src="../../assets/svg/next.svg" alt="" />
    </button>
  </div>
</template>

<script>
import "../../assets/css/muisc-button.scss";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("song", ["playing"]),
  },
  methods: {
    ...mapMutations("song", ["toSwitch", "playPrev", "playNext"]),
    ...mapActions(["song/toSwitch", "song/playPrev", "song/playNext"]),
    toPlayPrev() {
      this.playPrev();
    },
    toPlayNext() {
      console.log("playnext");
      this.playNext();
    },
  },
};
</script>

<style>
</style>