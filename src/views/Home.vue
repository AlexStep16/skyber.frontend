<template>
  <div class="container">
    <div class="main">
      <LoginForm />
      <button class="button_type-index button_theme-green" @click="makeTest">Создать тест</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';


export default {
  name: 'Home',
  components: {
    LoginForm
  },
  methods: {
    makeTest() {
      this.$router.push('/create');
    }
  }
}

</script>

<style lang="scss">
@import '@/common.blocks/body/_themes/body_themes-dark.scss';
@import '@/common.blocks/index.scss';

</style>

