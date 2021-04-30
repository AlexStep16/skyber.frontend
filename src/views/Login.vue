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
  name: 'Register',
  components: {
    LoginForm
  },
  methods: {
    
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
