<template>
  <div class="container">
    <div class="main">
      <div class="test">
        <TestForm />
      </div>
    </div>
  </div>
</template>

<script>
//import RegisterForm from '@/components/RegisterForm.vue';
import { mapGetters } from 'vuex'

export default {
  name: 'MakeTest',
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
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
