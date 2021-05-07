<template>
  <div class="make-footer flex flex-center">
    <div class="make-footer__link-wrapper mr5">
      <span>Поделиться в соцсетях:</span>
    </div>
    <div class="make-footer__save flex">
      <button
        class="test-send"
        @click="send"
        
      ><!-- v-if="!isAlreadySent" -->
        Отправить
      </button>
      <router-link
        class="test-send"
        style="display: inline-block"
        :to="'/test/edit/' + this.hash"
        v-if="isMine"
      >
        Редактировать
      </router-link>
    </div>
  </div>    
</template>

<script>

export default {
  name: 'SendFooter',
  props: ["link", "isAlreadySent", "isMine"],
  components: {
    
  },
  methods: {
    send() {
      this.$emit('send')
    },
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/make-footer.scss";
@import "@/common.blocks/maketest.scss";
</style>
