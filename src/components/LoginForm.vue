<template>
  <div class="login">
    <div class="login__form">
      <h1 class="mt0">Добро пожаловать!</h1>
      <p>
        Войдите в аккаунт, чтобы видеть свои тесты
      </p>
      <div class="login-errors">
        <ul class="login-errors__list" v-if="showErrors">
          <li v-for="(error, key) in loginErrors" :key="key" class="login-errors__item">
            <span>{{ error }}</span>
          </li>
        </ul>
      </div>
      <form action="api/login" class="form form_type-main mr8">
        <div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Введите E-Mail"
            class="input input_type-index"
            v-model="form.email"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Введите пароль"
            class="input input_type-index mt4"
            v-model="form.password"
          />
        </div>
        <div class="form-options mt7">
          <div class="flex flex-align-center">
            <input
              type="checkbox"
              class="checkbox"
              id="remember"
              name="remember"
            />
            <label for="remember" class="checkbox-label">Запомнить меня?</label>
          </div>
          <div class="flex flex-align-center">
            <router-link to="/password/recovery" class="forget-link"
              >Забыли пароль?</router-link
            >
          </div>
        </div>
        <button
          class="input input_type-main_submit input_theme-purple flex mt7"
          @click.prevent="submit"
        >
          <span>Войти</span><LoaderMini class="ml5" v-if="showEnterLoaderMini" />
        </button>
        <div class="register mt7">
          У вас нет аккаунта?
          <router-link to="/register" class="register-link"
            >Зарегистрируйтесь</router-link
          >
        </div>
      </form>
    </div>
    <div class="login__side">
      <img src="/pictures/Analytics_SVG.svg" width="450" @load="$emit('onLoad')" />
    </div>
  </div>
</template>

<script>
//import axios from "axios"
import { mapActions } from "vuex";
import LoaderMini from "@/components/Loaders/LoaderMini.vue";

export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        password: "",
        email: "",
      },
      showErrors: false,
      loginErrors: [],
      showEnterLoaderMini: false,
    };
  },
  components: {
    LoaderMini
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),

    submit() {
      this.showEnterLoaderMini = true
      this.login(this.form)
        .then(() => {
          this.showErrors = false
          this.$router.push({
            name: "List",
          });
        })
        .catch(() => {
          this.loginErrors = ['Вы ввели неверный E-Mail или пароль']
          this.showErrors = true
        }).finally(() => {
          this.showEnterLoaderMini = false
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/common.blocks/login.scss";
</style>
