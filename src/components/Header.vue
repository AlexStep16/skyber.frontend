<template>
  <div class="header">
    <router-link to="/list" class="header-logo">
      SKYBER
      <span class="header-logo__tag" v-if="type == 'test' || type == 'poll'">
        <span class="header-logo__dot">•</span>
        <span v-if="type == 'test'">тесты</span>
        <span v-else-if="type == 'poll'">опросы</span>
      </span>
    </router-link>
      <div class="header-links-list">
        <div class="header-links-list__item mobile-hidden" :class="$route.path === '/list' ? 'header-links-list__item_selected' : ''">
          <router-link to="/list" class="flex flex-align-center"><span>Главная</span></router-link>
        </div>
        <div class="header-links-list__item mobile-hidden" :class="$route.name === 'MakeTest' ? 'header-links-list__item_selected' : ''">
          <router-link to="/test/create" class="flex flex-align-center"><span>Создать тест</span></router-link>
        </div>
        <template v-if="isAuthorized">
          <!-- <div :class="$route.name === 'MakePoll' ? 'header-links-list__item header-links-list__item_selected' : 'header-links-list__item'">
            <router-link to="/poll/create" class="flex flex-align-center"><Add25 v-if="false" /><span>Создать опрос</span></router-link>
          </div> -->
          <div class="header-links-list__item header-links-list__item-margin header-links-list__item-exit mobile-hidden">
            <a href="#" @click.prevent="logout" class="flex flex-align-center"><span>Выход</span></a>
          </div>
        </template>
        <template v-else>
          
          <!-- <div :class="$route.name === 'MakePoll' ? 'header-links-list__item header-links-list__item_selected' : 'header-links-list__item'">
            <router-link to="/poll/create" class="flex flex-align-center"><Add25 v-if="false" /><span>Создать опрос</span></router-link>
          </div> -->
          <div class="header-links-list__item header-links-list__item-margin header-register" :class="$route.path === '/register' ? 'header-links-list__item_selected' : ''">
            <router-link to="/register" class="flex flex-align-center"><span>Зарегистрироваться</span></router-link>
          </div>
          <div class="header-links-list__item header-links-list__item-exit mobile-hidden">
            <router-link to="/login" class="flex flex-align-center"><span>Войти</span></router-link>
          </div>
        </template>
        <div class="header-links-list__item header-links-list__item-save" v-if="save">
          <a to="#" @click.prevent="$emit('save')" class="flex flex-align-center"><span>Сохранить</span></a>
        </div>
      </div>
    </div>
</template>

<script>
import store from '../store'
import { mapActions } from "vuex";

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
  props: ['type', 'save'],
  components: {
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
