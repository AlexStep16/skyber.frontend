<template>
  <div class="container body">
    <div class="main">
      <RegisterForm />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue';


export default {
  name: 'Register',
  components: {
    RegisterForm
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
