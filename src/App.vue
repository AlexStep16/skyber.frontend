<template>
  <div id="app" data-server-rendered="true">
    <SlideUp />
    <router-view/>
    <div class="modal modal_white" v-if="state">
      <Loader />
    </div>
    <MobileMenu />
  </div>
</template>

<script>
import Loader from "@/components/Loaders/Loader.vue";
import MobileMenu from "@/components/MobileMenu.vue";
import SlideUp from "@/components/SlideUp.vue";

export default {
  components: {
    Loader, MobileMenu, SlideUp
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>

.multiselect__option--selected.multiselect__option--highlight, .multiselect__option--highlight {
    background: #6699ff;
}

.multiselect__option--selected {
    background: #ffffff;
    color: #6699ff;
    font-weight: 700;
}
</style>
