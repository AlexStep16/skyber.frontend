<template>
  <div class="container body">
    <div class="main">
      <Header type="test" />
      <div class="password-recovery bg-white-shadow">
        <div class="login__form password-recovery__form">
          <h1 class="password-recovery__h1 mt0">Изменение пароля</h1>
          <p>
            Здесь вы можете изменить свой пароль
          </p>
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
          <form action="api/login" class="form form_type-main">
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Введите новый пароль"
                class="input input_type-index"
                v-model="form.password"
              />
            </div>
            <input
              type="submit"
              class="input input_type-main_submit input_theme-purple mt7"
              value="Изменить пароль"
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
  name: "PasswordRecoveryChange",
  data() {
    return {
      form: {
        password: '',
        hash: '',
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
      this.loginErrors = []
      if(this.form.password.length < 6) this.loginErrors.push('Пароль должен быть не меньше 6 символов')

      if(this.loginErrors.length === 0) {
        this.showErrors = false
        axios.post('/password/change', this.form)
          .then(() => {
            this.showErrors = false
            this.infoMessage = {body: 'Пароль успешно изменён', type: 'success'}
            setTimeout(() => {
              this.$router.push({name:'Login'})
            }, 3000);
          })
          .catch(() => {
            this.loginErrors = ['Что-то пошло не так. Попробуйте отправить ссылку заново, или перезагрузите страницу']
            this.showErrors = true
          });
      }
      else {
        this.showErrors = true
      }
    },
  },
  mounted() {
    this.form.hash = this.$route.params.hash
  },
  metaInfo() {
    return { 
        title: "Изменение пароля | Skyber",
        meta: [
            { name: 'description', content:  'Создавайте тесты и получайте мгновенные ссылки на них, делитесь с кем угодно и собирайте статистику по каждому вопросу!'},
            { property: 'og:title', content: "Изменение пароля | Skyber"},
            { property: 'og:site_name', content: 'Skyber'},
            {property: 'og:type', content: 'website'},    
            {name: 'robots', content: 'noindex,nofollow'} 
        ]
    }
  }
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
