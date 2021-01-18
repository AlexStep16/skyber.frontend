<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="options">
        <div>
          <input type="text" name="name" id="name" class="input input_type-option input_theme-dark" placeholder="Название теста или опроса" v-model="form.name">
        </div>
        <div class="mt5">
          <div class="option" @click='makeTest'>
            ТЕСТ
          </div>
          <div class="option" @click='makePoll'>
            ОПРОС
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import Header from "@/components/Header.vue"
import { mapMutations } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      form: {
        name: '',
        email: '',
        status: 'draft',
        variants: [{id: 0, name: 'Вариант 1'}]
      }
    }
  },
  components: {
    Header
  },
  methods: {
    ...mapMutations([
      'SET_TEST', 'SET_POLL'
    ]),

    makeTest() {
      if(this.form.name != "") {
        axios
        .post('test/create', this.form)
        .then((res) => {
          this.SET_TEST(res.data.data)
          this.$router.push({name: 'MakeTest'})
        })
        .catch(() => { 
          this.$router.push({name: 'Home'})
        })
      }
    },

    makePoll() {
      if(this.form.name != "") {
        axios.post('poll/create', this.form)
        .then((res) => {
          this.SET_POLL(res.data.data)
          this.$router.push({name: 'MakePoll'})
        })
        .catch(() => { 
          this.$router.push({name: 'Home'})
        })
      }
    }
  },
  mounted() {
    let userEmail = this.$store.state.auth.user.email;
    if(userEmail) {
      this.form.email = userEmail;
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/common.blocks/index.scss';
@import '@/common.blocks/options.scss';

</style>
