<template>
  <div class="header">
    <router-link to="/" class="header-logo">
      SKYBER
      <span class="header-logo__tag" v-if="type == 'test' || type == 'poll'">
        <span class="header-logo__dot">•</span>
        <span v-if="type == 'test'">тесты</span>
        <span v-else-if="type == 'poll'">опросы</span>
      </span>
    </router-link>
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
              <h3>@{{$store.state.auth.user.login}}</h3>
            </div>
            <li class="header-menu-list__item">
              <router-link to="/list" class="flex flex-align-center"><Home32 />Мои тесты</router-link>
            </li>
            <li class="header-menu-list__item">
              <router-link to="/test/create" class="flex flex-align-center"><Add32 />Создать тест</router-link>
            </li>
            <li class="header-menu-list__item">
              <router-link to="/poll/create" class="flex flex-align-center"><Add32 />Создать опрос</router-link>
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
              <router-link to="/test/create" class="flex flex-align-center"><Add32 />Создать тест</router-link>
            </li>
            <li class="header-menu-list__item">
              <router-link to="/poll/create" class="flex flex-align-center"><Add32 />Создать опрос</router-link>
            </li>
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


//Add SVG's
import Home32 from '../../public/Vectors/home32.svg'
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
    };
  },
  props: ['type'],
  components: {
    Home32, Add32, Exit32, NewUser32, Login32
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
