<template>
  <div class="homepage">
    <div class="homepage-paragraph">
      <div class="homepage-paragraph__line"></div>
      <div class="homepage-paragraph__text">
        <h1 class="homepage-paragraph__text-h1">
          Простой дизайн, большой функционал
        </h1>
        <p class="homepage-paragraph__text-p">
          Создайте свой тест, используя множество вариантов выбора ответа, такие
          как - <b>Список, дата, время, несколько вариантов и другие</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    makeTest() {
      this.$router.push("/create");
    },
  },
  metaInfo() {
    return { 
        title: "Главная | Skyber",
        meta: [
            { name: 'description', content:  'Создавайте тесты и получайте мгновенные ссылки на них, делитесь с кем угодно и собирайте статистику по каждому вопросу!'},
            { property: 'og:title', content: "Главная | Skyber"},
            { property: 'og:site_name', content: 'Skyber'},
            {property: 'og:type', content: 'website'},    
            {name: 'robots', content: 'index,follow'} 
        ]
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/homepage.scss";

.body {
  background-color: #fff;
}
</style>

