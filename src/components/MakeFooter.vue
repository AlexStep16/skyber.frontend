<template>
  <div class="make-footer flex flex-center">
    <div class="make-footer__link-wraper flex flex-align-center">
      <div class="make-footer__flex-wraper wd100 flex" v-if="link">
        <span v-if="type == 'test'">Ссылка на тест:</span> 
        <span v-else>Ссылка на опрос:</span> 
        <input 
          type="text" 
          v-model="link"
          ref="linkInput"
          class="input_type-link ml4"
          @click="$refs.linkInput.select()"
          style="width: 480px"
          readonly
        />
      </div>
    </div>
    <div class="make-footer__save flex">
      <div class="preview-eye mr7 pointer flex flex-align-center" @click="preview" v-if="type == 'poll'">
        <EyeSVG />
      </div>
      <button
        class="button button_type-index button_theme-blue ml7"
        @click="save"
      >
        Сохранить
      </button>
    </div>
  </div>    
</template>

<script>
import EyeSVG from '/public/pictures/eye.svg'

export default {
  name: 'MakeFooter',
  props: ["link", "type"],
  components: {
    EyeSVG
  },
  methods: {
    save() {
      this.$emit('save')
    },
    preview() {
      this.$emit('preview')
    },
    showSettings() {
      this.$emit('showSettings')
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/make-footer.scss";
</style>
