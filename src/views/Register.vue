<template>
  <div class="container body">
    <div class="main">
      <Header type="test" />
      <RegisterForm @onLoad="imageWasLoaded" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue';
import Header from "@/components/Header.vue";

export default {
  name: 'Register',
  components: {
    RegisterForm, Header
  },
  methods: {
    makeTest() {
      this.$router.push('/create');
    },
    imageWasLoaded() {
      this.$store.commit('HIDE_LOADER')
    }
  },
  mounted() {
    this.$store.commit('SHOW_LOADER')
  },
  metaInfo() {
    return { 
        title: "Регистрация | Skyber",
        meta: [
            { name: 'description', content:  'Зарегистрируйтесь в системе, чтобы навсегда сохранить свои тесты и иметь доступ с любого устройства!'},
            { property: 'og:title', content: "Регистрация | Skyber"},
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

@media (max-width: 495px) {
  .main {
    padding-bottom: 55px;
  }
}

@media (max-height: 565px) {
  .main {
    padding-top: 21px;
    align-items: flex-start;
  }
  .container {
    min-height: 100%;
    height: auto;
    padding-bottom: 40px;
  }
}
</style>
