<template>
  <div class="make-footer flex flex-center">
    <div class="make-footer__share-wrapper flex flex-center mr5">
      
    </div>
    <div class="make-footer__save flex">
      <button
        class="test-send mr4"
        style="display:flex!important"
        @click="send"
        
      ><!-- v-if="!isAlreadySent" -->
        <span>Отправить</span><LoaderMini class="ml5" v-if="showSendMiniLoader" />
      </button>
      <router-link
        class="test-send"
        style="display: inline-block"
        :to="'/test/edit/' + link"
        v-if="isMine"
      >
        Редактировать
      </router-link>
    </div>
  </div>    
</template>

<script>
import LoaderMini from "@/components/Loaders/LoaderMini.vue";

export default {
  name: 'SendFooter',
  props: ["link", "type", "name", "isAlreadySent", "isMine", "showSendMiniLoader"],
  data() {
    return {
      url: '',
      title: '',
    }
  },
  components: {
    LoaderMini
  },
  methods: {
    send() {
      this.$emit('send')
    },
  },
  mounted() {
    this.url = this.type == 'test' ? 'https://skyber.ru/tests/' + this.link : 'https://skyber.ru/polls/' + this.link
    this.title = this.type == 'test' ? 'Я создал тест на платформе Skyber' : 'Я создал опрос на платформе Skyber'
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/make-footer.scss";
@import "@/common.blocks/maketest.scss";
</style>
