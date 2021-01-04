<template>
  <div class="container">
    <div class="main">
      <div class="test">
        <div class="test__header">
          <TestForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import RegisterForm from '@/components/RegisterForm.vue';
import TestForm from '@/components/TestForm.vue'
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
    TestForm
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
@import '@/common.blocks/maketest.scss';

</style>
