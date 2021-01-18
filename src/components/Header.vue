<template>
  <div class="header">
    <h1>Logo</h1>
    <div class="header__links">
      <router-link to="/list">Мои тесты</router-link>
      <router-link to="/options">Создать тест</router-link>
      <a href="#" @click.prevent="logout">Выход</a>
    </div>
  </div>
</template>

<script>
//import axios from "axios"
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      signOutAction: 'auth/logout'
    }),

    logout() {
      this.signOutAction().then(() => {
        this.$router.push({ name: 'Home' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common.blocks/header.scss";
</style>
