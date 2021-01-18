<template>
  <form class="form form_type-register">
    <h1 style="color: white">Регистрация</h1>
    <div>
      <input type="text" name="email" id="email" placeholder="E-Mail" class="input input_type-index" v-model="form.email">
    </div>
    <div>
      <input type="password" name="password" id="password" placeholder="Пароль" class="input input_type-index mt4" v-model="form.password">
    </div>
    <div>
      <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Пароль ещё раз" class="input input_type-index mt4">
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
      form: {
        password: "",
        email: ""
      }
    }
  },
  methods: {
    submit() {
      axios.post('/register', this.form)
      .then(() => {
        this.$router.push({name: 'Home'})
      })
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>
