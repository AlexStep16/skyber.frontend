<template>
  <div :class="`info-modal info-modal-${message.type} ${show ? 'info-modal-show' : ''} pointer`" @click="specialFalse">
    {{ message.body }}
  </div>
</template>

<script>


export default {
  name: 'InfoModal',
  props: ['message'],
  data() {
    return {
      show: false,
      timeoutId: null,
    }
  },
  components: {
    
  },
  methods: {
    specialFalse() {
      this.show = false
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  },
  watch: {
    message: function() {
      this.show = true
      if(this.timeoutId == null) {
        this.timeoutId = setTimeout(() => {
          this.show = false
          this.timeoutId = null
        }, 10000)
      }
    }
  }
}

</script>

<style scoped lang="sass">
@import "@/common.blocks/infomodal.scss";
</style>
