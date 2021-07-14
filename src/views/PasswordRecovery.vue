<template>
  <div class="container body">
    <div class="main">
      <Header type="test" />
      <div class="login">
        <div class="login__form">
          <h1>Восстановление пароля!</h1>
          
          <div class="login-errors">
            <ul class="login-errors__list" v-if="showErrors">
              <li
                v-for="(error, key) in loginErrors"
                :key="key"
                class="login-errors__item"
              >
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
            <input
              type="submit"
              class="input input_type-main_submit input_theme-purple mt7"
              value="Восстановить доступ"
              @click.prevent="sendRequest"
            />
          </form>
        </div>
      </div>
    </div>
    <InfoModal :message="infoMessage" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import InfoModal from "@/components/InfoModal.vue";
import axios from "axios";

export default {
  name: "PasswordRecovery",
  data() {
    return {
      form: {
        email: '',
      },
      showErrors: false,
      loginErrors: [],
      infoMessage: {},
    }
  },
  components: {
    Header, InfoModal
  },
  methods: {
    sendRequest() {
      axios.post('/password/recovery', this.form)
        .then(() => {
          this.showErrors = false
          this.infoMessage = {body: 'На вашу почту была отправлена ссылка для восстановления пароля', type: 'success'}
          setTimeout(() => {
            this.$router.push({name:'List'})
          }, 3000);
        })
        .catch(() => {
          this.loginErrors = ['Такого E-Mail нет в нашей системе :(']
          this.showErrors = true
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/login.scss";

.body {
  background-color: #fff;
}

.container {
  height: 100%;
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
