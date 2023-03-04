<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  //在根组件.vue中添加如下代码 app.vue
  created() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("list", JSON.stringify(this.$store.state));
    });
    try {
      sessionStorage.getItem("list") &&
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("list"))
          )
        );
    } catch (err) {
      console.log(err);
    }
    sessionStorage.removeItem("list");
  },
};
</script>

<style>
</style>