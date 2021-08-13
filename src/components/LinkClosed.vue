<template>
  <div class="link-closed bg-white-shadow flex flex-vertical flex-center">
    <div class="flex flex-center" v-if="type == 'link'">
      <div class="flex mr5"><ClosedSVG /></div>
      <h4 class="link-closed__h4">Доступ к тесту по ссылке закрыт</h4>
    </div>
    <div class="flex flex-center" v-if="type == 'password'">
      <div class="flex mr5"><ClosedSVG /></div>
      <h4 class="link-closed__h4">Тест доступен по паролю</h4>
    </div>
    <form class="mt7" @submit.prevent v-if="type == 'password'">
      <input 
        class="input link-closed__password" 
        type="password" 
        placeholder="Введите пароль"
        v-model="password"
      />
      <button 
        class="link-closed__button button button_type-index button_theme-blue ml4" 
        type="submit"
        @click.prevent="sendPassword"
      >Открыть</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import ClosedSVG from '/public/pictures/closed.svg'

export default {
  name: 'LinkClosed',
  props: ['type'],
  components: {
    ClosedSVG
  },
  data() {
    return {
      password: ""
    }
  },
  methods: {
    sendPassword() {
      axios.post('password-closed', {
        password: this.password,
        test_hash: this.$route.params.hash
      }).then(res => {
        if(res.data === 'verified') {
          this.$emit('openTest')
        }
        else {
          this.$emit('wrongPassword')
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/link-closed.scss";

</style>
