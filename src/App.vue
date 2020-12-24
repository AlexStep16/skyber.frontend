<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/common.blocks/body/body.scss';
@import '@/common.blocks/body/_theme/body_theme_dark.scss';
@import '@/common.blocks/container/container.scss';
@import '@/common.blocks/main/main.scss';
@import '@/common.blocks/index/pt.scss';
@import '@/common.blocks/index/pb.scss';
@import '@/common.blocks/input/input.scss';
@import '@/common.blocks/form/form.scss';

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
