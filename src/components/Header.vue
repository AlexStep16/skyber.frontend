<template>
  <div class="header">
    <h1 class="header-logo">
      SKYBER
      <span class="header-logo__tag" v-if="path == '/test' || path == '/poll'">
        <span class="header-logo__dot">•</span>
        <span v-if="path == '/test'">тесты</span>
        <span v-else-if="path == '/poll'">опросы</span>
      </span>
    </h1>
    <div class="header__links">
      <div class="header-avatar" v-click-outside="hideMenu">
        <div class="header-avatar__image-wrapper">
          <div class="header-avatar__image" :style="userAvatarStyle" @click="toggleMenu"></div>
        </div>
        <div
          class="header-menu bg-white-border"
          v-if="!isMenuHide"
        >
          <ul class="header-menu-list" v-if="isAuthorized">
            <div class="header-menu-list__header flex flex-align-center">
              <h3>@alexander2000</h3>
            </div>
            <li class="header-menu-list__item">
              <router-link to="/list" class="flex flex-align-center"><List32 />Мои тесты</router-link>
            </li>
            <li class="header-menu-list__item">
              <router-link to="/list" class="flex flex-align-center"><Add32 />Создать тест</router-link>
            </li>
            <li class="header-menu-list__item">
              <a href="#" @click.prevent="logout" class="flex flex-align-center"><Exit32 />Выход</a>
            </li>
          </ul>
          <ul class="header-menu-list" v-else>
            <div class="header-menu-list__header flex flex-align-center">
              <h3>@guess13358</h3>
            </div>
            <li class="header-menu-list__item">
              <router-link to="/register" class="flex flex-align-center"><NewUser32 />Зарегистрироваться</router-link>
            </li>
            <li class="header-menu-list__item">
              <router-link to="/login" class="flex flex-align-center"><Login32 />Войти</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'
import { mapActions } from "vuex";
import { mapMutations } from "vuex";


//Add SVG's
import List32 from '../../public/Vectors/list32.svg'
import Add32 from '../../public/Vectors/add32_new.svg'
import Exit32 from '../../public/Vectors/exit32.svg'
import Login32 from '../../public/Vectors/login32.svg'
import NewUser32 from '../../public/Vectors/new-user32.svg'


export default {
  data() {
    return {
      isMenuHide: true,
      isAuthorized: store.getters['auth/authenticated'],
      userAvatarStyle: {
        backgroundImage: 'url(/pictures/man.png)'
      },
      path: this.$route.path,
    };
  },
  components: {
    List32, Add32, Exit32, NewUser32, Login32
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/logout",
    }),
    ...mapMutations(['CLEAR_TEST', 'CLEAR_POLL']),

    logout() {
      this.signOutAction().then(() => {
        this.CLEAR_TEST()
        this.CLEAR_POLL()
        this.$router.push({ name: "Home" });
      });
    },

    hideMenu() {
      this.isMenuHide = true;
    },

    toggleMenu() {
      this.isMenuHide = !this.isMenuHide;
    },
  },
  mounted() {
    if (store.getters['auth/authenticated']) this.isAuthorized = true
    else this.isAuthorized = false
  }
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/header.scss";
@import "@/common.blocks/main.scss";
</style>
