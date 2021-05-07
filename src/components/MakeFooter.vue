<template>
  <div class="make-footer flex flex-center">
    <div class="make-footer__link-wrapper mr5">
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
    <div class="make-footer__save flex">
      <div class="preview-eye mr7 pointer flex flex-align-center" @click="preview" v-if="type == 'poll'">
        <Eye />
      </div>
      <button
        class="button button_type-index button_theme-blue"
        @click="save"
      >
        Сохранить
      </button>
    </div>
  </div>    
</template>

<script>
import Eye from '../../public/pictures/eye.svg'

export default {
  name: 'MakeFooter',
  props: ["link", "type"],
  components: {
    Eye
  },
  methods: {
    save() {
      this.$emit('save')
    },
    preview() {
      this.$emit('preview')
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/make-footer.scss";
</style>
