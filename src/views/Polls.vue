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
            <youtube v-if="pollVideoLink" :video-id="pollVideoLink" class="test-video">
            </youtube>
            <div class="test__image mt5" v-if="image.link != null">
              <img :src="image.link" />
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
            <button
              class="button button_type-index button_theme-blue mt6"
              @click="sendPoll"
            >
              Отправить
            </button>
          </template>
        </div>
      </div>
    </div>
    <InfoModal :message="infoMessage" />
    <SuccessModal v-if="showSuccess" :message="successMessage" />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue"
import VariantFewOutput from "@/components/Polls/VariantFewOutput.vue";
import VariantOneOutput from "@/components/Polls/VariantOneOutput.vue";
import InfoModal from "@/components/InfoModal.vue";
import SuccessModal from "@/components/SuccessModal.vue";

export default {
  name: "MakePoll",
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
    };
  },
  components: {
    Header,
    VariantOneOutput,
    VariantFewOutput, InfoModal,
    SuccessModal
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
