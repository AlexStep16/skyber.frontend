<template>
  <div class="make-footer flex flex-center">
    <div class="make-footer__link-wrapper">
      Ссылка на тест: 
      <input 
        type="text" 
        v-model="link"
        ref="linkInput"
        class="make-footer__link ml4"
        @click="$refs.linkInput.select()"
        :style="{width: (link.length * 7.5) + 'px'}"
      />
    </div>
    <div class="make-footer__save">
      <button
        class="button button_type-index button_theme-blue"
        @click="saveTest"
      >
        Сохранить
      </button>
    </div>
  </div>    
</template>

<script>


export default {
  name: 'MakeFooter',
  props: ["link"],
  components: {
    
  },
  methods: {
    saveTest() {

    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/make-footer.scss";
</style>
