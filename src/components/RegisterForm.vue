<template>
  <div class="login">
    <div class="login__form">
      <h1>Добро пожаловать!</h1>
      <p>
        Регистрация аккаунта
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
            type="text"
            name="login"
            id="login"
            placeholder="Введите логин"
            class="input input_type-index"
            v-model="form.login"
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
        rememberMe: '',
        login: ''
      },
      showErrors: false,
      loginErrors: []
    };
  },
  methods: {
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    submit() {
      this.loginErrors = []
      if(this.form.email == '') this.loginErrors.push('Вы не ввели Email')
      else if(!this.validateEmail(this.form.email)) this.loginErrors.push('Неверный формат Email')
      if(this.form.login == '') this.loginErrors.push('Поле логин не может быть пустым')
      if(this.form.password.length < 6) this.loginErrors.push('Пароль должен быть не меньше 6 символов')
      if(this.form.password !== this.form.confirmPassword) this.loginErrors.push('Пароли не совпадают')

      if(this.loginErrors.length === 0) {
        axios.post("/register", this.form).then(() => {
          this.showErrors = false
          this.$router.push({ name: "Login" });
        })
        .catch((e) => {
          if(e.response.data == 'Email exist') this.loginErrors = ['Пользователь с таким Email уже зарегистрирован']
          else this.loginErrors = ['Произошла ошибка, попробуйте перезагрузить страницу или попробовать позже']
          this.showErrors = true
        });
      }
      else {
        this.showErrors = true
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/common.blocks/login.scss";
</style>
