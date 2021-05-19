<template>
  <div class="make-footer flex flex-center">
    <div class="make-footer__link-wrapper flex flex-align-center mr5">
      <div v-if="link">
        <span v-if="type == 'test'">Ссылка на тест:</span> 
        <span v-else>Ссылка на опрос:</span> 
        <input 
          type="text" 
          v-model="link"
          ref="linkInput"
          class="make-footer__link ml4"
          @click="$refs.linkInput.select()"
          :style="{width: (link.length * 7.5) + 'px'}"
          readonly
        />
      </div>
    </div>
    <div class="make-footer__save flex">
      <div class="preview-eye mr7 pointer flex flex-align-center" @click="preview" v-if="type == 'poll'">
        <EyeSVG />
      </div>
      <SettingsSVG @click="showSettings" v-if="type == 'test' || type == 'poll'" class="pointer" />
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
import EyeSVG from '../../public/pictures/eye.svg'
import SettingsSVG from '../../public/pictures/settings.svg'

export default {
  name: 'MakeFooter',
  props: ["link", "type"],
  components: {
    EyeSVG, SettingsSVG
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
