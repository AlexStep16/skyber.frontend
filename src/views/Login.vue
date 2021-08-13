<template>
  <div class="container body">
    <div class="main">
      <Header type="test" />
      <LoginForm @onLoad="imageWasLoaded" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';
import Header from "@/components/Header.vue";

export default {
  name: 'Register',
  components: {
    LoginForm, Header
  },
  methods: {
    imageWasLoaded() {
      this.$store.commit('HIDE_LOADER')
    }
  },
  mounted() {
    this.$store.commit('SHOW_LOADER')
  },
  metaInfo() {
    return { 
        title: "Войти | Skyber",
        meta: [
            { name: 'description', content:  'Войдите в систему чтобы увидеть созданные вами тесты!'},
            { property: 'og:title', content: "Войти | Skyber"},
            { property: 'og:site_name', content: 'Skyber'},
            {property: 'og:type', content: 'website'},    
            {name: 'robots', content: 'index,follow'} 
        ]
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/common.blocks/index.scss';

.body {
  background-color: #FFF;
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

@media (max-height: 565px) {
  .main {
    padding-top: 21px;
    align-items: flex-start;
  }
  .container {
    min-height: 100%;
    height: auto;
    padding-bottom: 90px;
  }
}
</style>
