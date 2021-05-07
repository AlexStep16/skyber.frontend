<template>
  <div class="modal modal_white flex flex-center">
    <div class="modal-container">
      <div class="modal-confirm-block flex flex-align-center">
        <h2 class="modal-confirm-block__message modal-confirm-block__message-success flex flex-center"><SuccessSVG />{{ message }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import SuccessSVG from '../../public/pictures/success.svg'

export default {
  name: 'SuccessModal',
  props: ['message'],
  components: {
    SuccessSVG
  },
  methods: {
    
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
</style>
