<template>
  <div class="time">
    <span>
      {{ currentTime | formatSeconds }}/{{ totalTime | formatSeconds }}</span
    >
  </div>
</template>

<script>
import { formatSeconds } from "../../plugins/filters";
import { mapState } from "vuex";
import "../../assets/css/time.scss";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState("song", ["currentTime", "totalTime"]),
  },
  filters: {
    formatSeconds,
  },
};
</script>

<style>
</style>