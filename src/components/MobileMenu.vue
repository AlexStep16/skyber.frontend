<template>
  <div class="mobile-menu flex flex-center">
    <div class="mobile-menu__wraper">
      <router-link to="/list" class="mobile-menu-item flex flex-center">
        <HomeSVG :class="$route.path !== '/list' ? '' : 'd-none'" />
        <HomeSVGPurple :class="$route.path === '/list' ? '' : 'd-none'" />
      </router-link>
      <router-link to="/test/create" class="mobile-menu-item flex flex-center">
        <AddSVG :class="$route.name !== 'MakeTest' ? '' : 'd-none'" />
        <AddSVGPurple :class="$route.name === 'MakeTest' ? '' : 'd-none'" />
      </router-link>
      <div @click="logout" v-if="$store.getters['auth/authenticated']" class="mobile-menu-item flex flex-center pointer">
        <ExitSVG />
        <ExitSVGPurple class="d-none" />
      </div>
      <router-link to="/login" @click.prevent="logout" v-if="!$store.getters['auth/authenticated']" class="mobile-menu-item flex flex-center">
        <LoginSVG :class="($route.name !== 'Login' && $route.name !== 'Register') ? '' : 'd-none'" />
        <LoginSVGPurple :class="($route.name === 'Login' || $route.name === 'Register') ? '' : 'd-none'" />
      </router-link>
    </div>
  </div>
</template>

<script>
import HomeSVGPurple from '/public/Vectors/mobile-menu/home32_purple.svg'
import ExitSVGPurple from '/public/Vectors/mobile-menu/exit32_purple.svg'
import LoginSVGPurple from '/public/Vectors/mobile-menu/login32_purple.svg'
import AddSVGPurple from '/public/Vectors/mobile-menu/add32_new-purple.svg'
import HomeSVG from '/public/Vectors/mobile-menu/home32.svg'
import ExitSVG from '/public/Vectors/mobile-menu/exit32.svg'
import LoginSVG from '/public/Vectors/mobile-menu/login32.svg'
import AddSVG from '/public/Vectors/mobile-menu/add32_new.svg'

import { mapActions } from "vuex";

export default {
  name: 'MobileMenu',
  components: {
    HomeSVG, ExitSVG, AddSVG, LoginSVGPurple,
    HomeSVGPurple, ExitSVGPurple, AddSVGPurple, LoginSVG
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/logout",
    }),

    logout() {
      this.signOutAction().then(() => {
        if(this.$route.name == 'MakeTest') location.reload()
        else this.$router.push({ name: "Login" });
      });
    },
  },
}

</script>

<style lang="scss" scoped>
@import '@/common.blocks/mobile-menu.scss';

</style>
