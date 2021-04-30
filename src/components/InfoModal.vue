<template>
  <div :class="`info-modal info-modal-${message.type} ${show ? 'info-modal-show' : ''}`">
    {{ message.body }}
  </div>
</template>

<script>


export default {
  name: 'InfoModal',
  props: ['message'],
  data() {
    return {
      show: false
    }
  },
  components: {
    
  },
  methods: {
    
  },
  watch: {
    message: function() {
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 4000)
    }
  }
}

</script>

<style scoped lang="sass">
@import "@/common.blocks/infomodal.scss";
</style>
