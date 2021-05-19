<template>
  <div class="settings bg-white-shadow">
    <div class="settings-header pointer" @click="showSettings = !showSettings">
      <h2 class="settings-header__h2">Настройки теста</h2>
    </div>
    
    <div :class="showSettings ? 'settings__main' : 'none'">
      <div class="settings-item">
        <span class="settings-item__text">Управление сценариями</span>
        <div
          @click="showScenariosMenu"
          class="settings-item__link pointer flex flex-center"
        >
          <span class="mr3">Меню управления</span>
          <img src="/pictures/link.svg">
        </div>
      </div>
      
      <div class="settings-item mt6">
        <span class="settings-item__text">Открыть доступ по ссылке для всех</span>
        <label class="slider">
          <input type="checkbox" class="none">
          <span class="slider__circle slider__round"></span>
        </label>
      </div>

      <div class="settings-item mt6">
        <span class="settings-item__text">Доступ по паролю</span>
        <label class="slider">
          <input type="checkbox" class="none">
          <span class="slider__circle slider__round"></span>
        </label>
      </div>

      <div
        class="settings-item mt6"
      >
        <input
          class="custom-checkbox"
          type="checkbox"
          id="setting-2"
          name="setting-2"
        />
        <label class="settings-item__text settings-item__before-right" for="setting-2">Выбрать ответы для теста</label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  props: ['hash'],
  data() {
    return {
      showSettings: false,
    }
  },
  components: {
    
  },
  methods: {
    showScenariosMenu() {
      this.$emit('showScenarios')
    }
  },
  mounted() {
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/form-slider_type-main.scss";
@import "@/common.blocks/settings.scss";
</style>
