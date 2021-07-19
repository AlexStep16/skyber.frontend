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
      <div class="header-links-list">
        <div :class="$route.path === '/list' ? 'header-links-list__item header-links-list__item_selected' : 'header-links-list__item'">
          <router-link to="/list" class="flex flex-align-center"><Home25 v-if="false" /><span>Главная</span></router-link>
        </div>
        <div :class="$route.name === 'MakeTest' ? 'header-links-list__item header-links-list__item_selected' : 'header-links-list__item'">
          <router-link to="/test/create" class="flex flex-align-center"><Add25 v-if="false" /><span>Создать тест</span></router-link>
        </div>
        <template v-if="isAuthorized">
          <!-- <div :class="$route.name === 'MakePoll' ? 'header-links-list__item header-links-list__item_selected' : 'header-links-list__item'">
            <router-link to="/poll/create" class="flex flex-align-center"><Add25 v-if="false" /><span>Создать опрос</span></router-link>
          </div> -->
          <div class="header-links-list__item header-links-list__item-margin header-links-list__item-exit">
            <a href="#" @click.prevent="logout" class="flex flex-align-center"><Exit25 v-if="false" /><span>Выход</span></a>
          </div>
        </template>
        <template v-else>
          
          <!-- <div :class="$route.name === 'MakePoll' ? 'header-links-list__item header-links-list__item_selected' : 'header-links-list__item'">
            <router-link to="/poll/create" class="flex flex-align-center"><Add25 v-if="false" /><span>Создать опрос</span></router-link>
          </div> -->
          <div class="header-links-list__item header-links-list__item-margin" :class="$route.path === '/register' ? 'header-links-list__item_selected' : ''">
            <router-link to="/register" class="flex flex-align-center"><NewUser25 v-if="false" /><span>Зарегистрироваться</span></router-link>
          </div>
          <div class="header-links-list__item header-links-list__item-exit">
            <router-link to="/login" class="flex flex-align-center"><Login25 v-if="false" /><span>Войти</span></router-link>
          </div>
        </template>
      </div>
    </div>
</template>

<script>
import store from '../store'
import { mapActions } from "vuex";


//Add SVG's
import Home25 from '/public/Vectors/home25.svg'
import Add25 from '/public/Vectors/add25_new.svg'
import Exit25 from '/public/Vectors/exit25.svg'
import Login25 from '/public/Vectors/login25.svg'
import NewUser25 from '/public/Vectors/new-user25.svg'


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
    Home25, Add25, Exit25, NewUser25, Login25
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
