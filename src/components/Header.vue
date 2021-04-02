<template>
  <div class="header">
    <h1>Logo</h1>
    <div class="header__links">
      <div class="header-avatar" v-click-outside="hideMenu">
        <div class="header-avatar__image-wrapper">
          <div class="header-avatar__image" @click="toggleMenu"></div>
        </div>
        <div
          class="header-menu bg-white-border"
          v-if="!isMenuHide"
        >
          <ul class="header-menu-list">
            <div class="header-menu-list__header flex flex-align-center">
              <h3>@alexander2000</h3>
            </div>
            <li class="header-menu-list__item">
              <router-link to="/list">Мои тесты</router-link>
            </li>
            <li class="header-menu-list__item">
              <router-link to="/list">Создать тест</router-link>
            </li>
            <li class="header-menu-list__item">
              <a href="#" @click.prevent="logout">Выход</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios"
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isMenuHide: true,
    };
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/logout",
    }),

    logout() {
      this.signOutAction().then(() => {
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
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/header.scss";
@import "@/common.blocks/main.scss";
</style>
