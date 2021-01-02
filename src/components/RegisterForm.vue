<template>
  <form class="form form_type-register">
    <h1 style="color: white">Регистрация</h1>
    <div>
      <input type="text" name="email" id="email" placeholder="E-Mail" class="input input_type-index pt4" v-model="email">
    </div>
    <div>
      <input type="password" name="password" id="password" placeholder="Пароль" class="input input_type-index mt4" v-model="password">
    </div>
    <div>
      <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Пароль ещё раз" class="input input_type-index mt4" v-model="passwordConfirm">
    </div>
    <input type="submit" class="input input_type-submit_full input_theme-blue mt4" value="Войти" @click.prevent="submit">
  </form>
</template>

<script>
import axios from "axios"

export default {
  name: 'RegisterForm',
  data() {
    return {
      password: "",
      passwordConfirm: "",
      email: ""
    }
  },
  methods: {
    submit() {/*
      let user = {
        name: this.name,
        email: this.email,
        password: this.password
      }*/
      axios.get('api/check').then((res) => {
        console.log(res);
      });
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>
