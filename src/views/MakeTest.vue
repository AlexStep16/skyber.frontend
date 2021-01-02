<template>
  <div class="container">
    <div class="main">
      <div class="test"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import RegisterForm from '@/components/RegisterForm.vue';


export default {
  name: 'MakeTest',
  components: {
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
@import '@/common.blocks/register.scss';

</style>
