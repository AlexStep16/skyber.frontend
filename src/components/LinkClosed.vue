<template>
  <div class="link-closed bg-white-border flex flex-vertical flex-center">
    <h4 class="link-closed__h4" v-if="type == 'link'"><ClosedSVG class="mr5" />Доступ к тесту по ссылке закрыт</h4>
    <h4 class="link-closed__h4" v-if="type == 'password'"><ClosedSVG class="mr5" />Тест доступен по паролю</h4>
    <div v-if="type == 'password'">
      <input 
        class="input link-closed__password" 
        type="password" 
        placeholder="Введите пароль"
        v-model="password"
      />
       <input 
        class="input input_type-submit" 
        type="submit"
        @click.prevent="sendPassword"
      />
    </div>
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
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.link-closed {
  width: 700px;
  height: 200px;

  &__h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    color: #444;
    display: flex;
    align-items: center;
  }

  &__password {
    border-radius: 10px;
    border: 1px solid rgba(150,150,150,0.3);
  }
}
</style>
