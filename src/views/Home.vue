<template>
  <div class="container body">
    <div class="main">
      <LoginForm />
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

<style lang="scss" scoped>
@import '@/common.blocks/index.scss';

.body {
  background-color: #FFF;
}
</style>

