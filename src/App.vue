<template>
  <div id="app">
    <router-view/>
    <div class="modal modal_white" v-if="state">
      <Loader />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  components: {
    Loader
  },
  computed: {
    state() {
      return this.$store.getters['loaderState']
    }
  }
}
</script>

<style lang="scss">
@import '@/common.blocks/aliases.scss';
@import '@/common.blocks/main.scss';


html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}

body {
  overflow-y: auto;
}

</style>

<style lang="scss" scoped>
@import '@/common.blocks/index.scss';
</style>
