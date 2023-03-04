<template>
  <div>
    <div class="album">
      <img
        class="bar-support"
        src="../../assets/img/play-bar-support.png"
        alt=""
      />
      <img
        class="bar"
        :class="playing ? 'turn-left' : 'turn-right'"
        src="../../assets/img/play-bar.png"
        alt=""
      />

      <div class="vinyl">
        <img
          class="cover"
          :class="playing ? 'cover-playing' : 'cover-paused'"
          :src="url"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/cartoon.scss";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  props: ["url"],
  data() {
    return {};
  },
  computed: {
    ...mapState("song", ["playing", "songlist", "currentIndex"]),
  },
  methods: {
    ...mapMutations("song", ["toSwitch"]),
    ...mapActions(["song/toSwitch"]),
  },
};
</script>

<style>
</style>