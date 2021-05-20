<template>
  <div class="settings bg-white-shadow">
    <div class="settings-header flex flex-align-center flex-justify-between pointer" @click="showSettings = !showSettings">
      <h2 class="settings-header__h2">Настройки теста</h2>
      <svg viewBox="0 0 96 96" width="20" height="20" xmlns="http://www.w3.org/2000/svg" :class="showSettings ? 'svg-down-revert' : ''"><title/><path fill="#fff" d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z"/></svg>
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

.svg-down-revert {
  transform: rotateX(180deg);
}
</style>
