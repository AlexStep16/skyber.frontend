<template>
  <div class="page-404 flex flex-center">
    <Header />
    <div class="flex flex-vertical flex-align-center">
      <h1 class="page-404__header mt0 mb0">404</h1>
      <p class="page-404__description mt5">Страница не найдена</p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: 'Page404',
  components: {
    Header
  },
  methods: {
    
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/page-404.scss";
</style>
