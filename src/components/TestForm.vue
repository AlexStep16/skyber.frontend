<template>
  <form class="form form_type-main">
    <div>
      <h1>Название теста</h1>
      <input type="text" name="name" id="name" placeholder="Введите E-Mail" class="input input_type-index pt4" v-model="testForm.name">
    </div>
    <div>
      <h1>Название теста</h1>
      <input type="text" name="description" id="description" placeholder="Введите пароль" class="input input_type-index mt4" v-model="testForm.description">
    </div>
    <input type="submit" class="input input_type-submit_full input_theme-blue mt4" value="Войти" @click.prevent="submit">
  </form>
</template>

<script>
//import axios from "axios"

export default {
  name: 'LoginForm',
  data() {
    return {
      testForm: {
        name: "",
        description: ""
      }
    }
  },
  methods: {
    submit() {
      
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>
