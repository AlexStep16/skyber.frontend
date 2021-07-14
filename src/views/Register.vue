<template>
  <div class="container body">
    <div class="main">
      <Header type="test" />
      <RegisterForm @onLoad="imageWasLoaded" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue';
import Header from "@/components/Header.vue";

export default {
  name: 'Register',
  components: {
    RegisterForm, Header
  },
  methods: {
    makeTest() {
      this.$router.push('/create');
    },
    imageWasLoaded() {
      this.$store.commit('HIDE_LOADER')
    }
  },
  mounted() {
    this.$store.commit('SHOW_LOADER')
  }
}

</script>

<style lang="scss" scoped>
@import '@/common.blocks/index.scss';

.body {
  background-color: #FFF;
}

.container {
  height: 100%;
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
