<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/common.blocks/body/_themes/body_themes-dark.scss';
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

</style>
