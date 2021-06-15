<template>
  <div class="container flex flex-justify-center">
    <Header type='poll' />
    <div class="main">
      <div class="poll">
        <div class="poll__block bg-white-shadow">
          <h1 class="poll-tag">Опрос</h1>
          <template>
            <h3 class="poll-name mt7 mb7">{{ pollName }}</h3>
            <div class="poll-description">{{ pollDescription }}</div>
            <div class="test-video-wraper mt6" v-if="pollVideoLink">
              <div class="modal modal_white absolute" v-if="!videoLoadDone">
                <Loader />
              </div>
              <youtube id="youtube" ref="youtube" :video-id="pollVideoLink" class="test-video">
              </youtube>
            </div>
            <div class="test-image mt6" v-if="image.link != null">
              <div class="test-image__wraper">
                <img :src="image.link" />
                <div class="modal modal_white absolute" v-if="imageLoading">
                  <Loader />
                </div>
              </div>
            </div>
            <VariantFewOutput
              :variants="variants"
              :selected="selected"
              @ready="selected = $event"
              v-if="type == 'Несколько из списка'"
            />
            <VariantOneOutput
              :variants="variants"
              :selected="selected"
              @ready="selected = $event"
              v-if="type == 'Один из списка'"
            />
          </template>
        </div>
      </div>
    </div>
    <InfoModal :message="infoMessage" />
    <SuccessModal v-if="showSuccess" :message="successMessage" />
    <SendFooter 
      :link="hash"
      type="poll"
      :name="pollName"
      :isMine="isMine"
      :isAlreadySent="isAlreadySent"
      @send="sendPoll"
    />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue"
import VariantFewOutput from "@/components/Polls/VariantFewOutput.vue";
import VariantOneOutput from "@/components/Polls/VariantOneOutput.vue";
import InfoModal from "@/components/InfoModal.vue";
import SuccessModal from "@/components/SuccessModal.vue";
import SendFooter from "@/components/SendFooter.vue";

export default {
  name: "Polls",
  data() {
    return {
      pollId: "",
      pollName: "",
      pollDescription: "",
      pollVideoLink: '',
      variants: [],
      selected: [],
      type: '',
      infoMessage: {},
      image: {
        data: null,
        link: null,
      },
      showSuccess: false,
      successMessage: '',
      isMine: true,
      isAlreadySent: true,
      hash: this.$route.params.hash,
      videoLoadDone: false,
      imageLoading: false,
    };
  },
  components: {
    Header,
    VariantOneOutput,
    VariantFewOutput, InfoModal,
    SuccessModal,
    SendFooter
  },
  methods: {
    sendPoll() {
      if(this.selected.length == 0) {
        this.infoMessage = {
          body: 'Вы не выбрали ни одного варианта',
          type: 'warning'
        }
        return
      }
      if(!Array.isArray(this.selected)) {
        this.selected = [this.selected]
      }
      axios
        .post("pollAnswers/send", {
          selected: this.selected,
          pollId: this.pollId,
          fingerprint: window.VISITOR_ID
        })
        .then(() => {
          this.successMessage = "Успешно отправлено"
          this.showSuccess = true
          setTimeout(() => {
            this.showSuccess = false
          }, 2000)
        });
    },
  },
  mounted() {
    this.showImagePreloader = true
    this.imageLoading = true

    this.$store.commit('SHOW_LOADER')
    axios.get("poll/getByHash/" + this.$route.params.hash).then((res) => {
      res = res.data.data;
      this.pollId = res.id;
      this.pollName = res.pollName;
      this.pollDescription = res.pollDescription;
      this.pollVideoLink = res.videoLink
      this.variants = JSON.parse(res.variants);
      this.type = res.typeVariants;
      this.image.link = res.imageLink
      if(this.image.link != null) {
        this.imageLoading = false
      }
      else {
        this.showImagePreloader = false
      }
      if(res.fingerprint == window.VISITOR_ID) this.isMine = true
      else this.isMine = false

      axios.post('test/dispatch/check', {
        pollId: this.pollId,
        fingerprint: window.VISITOR_ID,
      }).then((res) => {
        if(!res.data) {
          this.isAlreadySent = false
        }
        else {
          this.isAlreadySent = true
        }
      })
    }).finally(() => {
      this.$store.commit('HIDE_LOADER')
    });

    this.$nextTick(function() {
      if(this.$refs.youtube) {
        this.videoLoadDone = true
      }
      else {
        let th = this
        let intervalID = setInterval(function() {
          if(th.$refs.youtube) {
            th.videoLoadDone = true
          }
        }, 1000)
        if(this.videoLoadDone == true) clearInterval(intervalID)
      }
    })
  },
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/makepoll.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";
</style>
