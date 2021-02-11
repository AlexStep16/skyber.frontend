<template>
  <div class="login">
    <div class="login__form">
      <h1>Добро пожаловать!</h1>
      <p>
        Зарегистрируйся или войди в свой аккаунт, чтобы создать свой собственный
        тест или опрос
      </p>
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
          <div>
            <input
              type="checkbox"
              class="checkbox"
              id="remember"
              name="remember"
            />
            <label for="remember" class="checkbox-label">Запомнить меня?</label>
          </div>
          <div>
            <router-link to="/foo" class="forget-link"
              >Забыли пароль?</router-link
            >
          </div>
        </div>
        <input
          type="submit"
          class="input input_type-main_submit input_theme-purple mt7"
          value="Войти"
          @click.prevent="submit"
        />
        <div class="register mt7">
          У вас нет аккаунта?
          <router-link to="/register" class="register-link"
            >Зарегистрируйтесь</router-link
          >
        </div>
      </form>
    </div>
    <div class="login__side">
      <img src="/pictures/Wavy_Bus-35_Single-03.jpg" width="500" />
    </div>
  </div>
</template>

<script>
//import axios from "axios"
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        password: "",
        email: "",
      },
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),

    submit() {
      this.login(this.form)
        .then(() => {
          this.$router.push({
            name: "Options",
          });
        })
        .catch(() => {
          console.log("You enter wrong password or email");
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/common.blocks/login.scss";
</style>
