<template>
  <div class="login">
    <div class="login__form">
      <h1>Добро пожаловать!</h1>
      <p>
        Регистрация аккаунта
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
            placeholder="Введите пароль"
            class="input input_type-index mt4"
            v-model="form.password"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Введите пароль ещё раз"
            class="input input_type-index mt4"
            v-model="form.confirmPassword"
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
        </div>
        <input
          type="submit"
          class="input input_type-main_submit input_theme-purple mt7"
          value="Регистрация"
          @click.prevent="submit"
        />
        <div class="register mt7">
          У вас уже аккаунт?
          <router-link to="/login" class="register-link"
            >Войти</router-link
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
import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      form: {
        password: "",
        confirmPassword: "",
        email: "",
        rememberMe: ''
      },
    };
  },
  methods: {
    submit() {
      axios.post("/register", this.form).then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/common.blocks/login.scss";
</style>
