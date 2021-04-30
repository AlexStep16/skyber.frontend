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
