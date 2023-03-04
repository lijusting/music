<template>
  <div>
    <!-- element ui常规布局-->
    <el-row>
      <el-col :span="12">
        <Song></Song>
      </el-col>
      <el-col :span="12"><Lyric></Lyric> </el-col>
    </el-row>
  </div>
</template>

<script>
import Lyric from "@/components/lyric.vue";
import "../assets/css/app-play.scss";
import Song from "../components/song.vue";
export default {
  components: {
    Song,
    Lyric,
  },
};
</script>

<style>
</style>