<template>
  <form action="api/login" class="form form_type-main mr8">
    <div>
      <input type="text" name="email" id="email" placeholder="E-Mail" class="input input_type-index" v-model="form.email">
    </div>
    <div>
      <input type="password" name="password" id="password" placeholder="Пароль" class="input input_type-index mt4" v-model="form.password">
    </div>
    <input type="submit" class="input input_type-submit_full input_theme-blue mt4" value="Войти" @click.prevent="submit">
  </form>
</template>

<script>
//import axios from "axios"
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        password: "",
        email: ""
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),

    submit() {
      this.login(this.form).then(() => {
        this.$router.push({
          name : 'Options'
        })
      }).catch( () => {
        console.log('You enter wrong password or email')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>
