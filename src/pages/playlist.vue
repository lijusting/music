<template>
  <div class="playlist">
    <div
      class="playlist-cover"
      :class="{ hover: isHover }"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      @click="jumpSonglist(id)"
    >
      <img :src="coverImgurl" />
    </div>
    <div class="playlist-name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    id: 0,
    name: "",
    coverImgurl: "",
  },
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
    jumpSonglist(id) {
      console.log("我跳转了");
      this.$router.push({ path: `/songlist`, query: { id } });
    },
  },
};
</script>

<style lang="scss">
.playlist {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

  &-cover {
    width: 150px;
    height: 150px;
    overflow: hidden;
    transition: transform 0.3s ease;

    &.hover {
      transform: scale(1.1);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-name {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
