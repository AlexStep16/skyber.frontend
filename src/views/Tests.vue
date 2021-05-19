<template>
  <div class="container flex flex-justify-center">
    <Header type='test' />
    <div class="main">
      <div class="test">
        <div class="test__block_wraper mt7">
          <div class="test__block bg-white-shadow test__header pt7 pb7">
            <h1 class="h1-test mt0 mb0">{{ testName }}</h1>
            <div class="test__description mt6" v-if="testDescription">{{ testDescription }}</div>
            <div class="test-video-wraper mt6" v-if="testVideoLink">
              <div class="modal modal_white absolute" v-if="!videoLoadDone">
                <Loader />
              </div>
              <youtube id="youtube" ref="youtube" :video-id="testVideoLink" class="test-video">
              </youtube>
            </div>
            <div class="test__image mt6" v-if="image.link != null">
              <img :src="image.link" />
              <div class="modal modal_white absolute" v-if="imageLoading">
                <Loader />
              </div>
            </div>
          </div>
        </div>
        <div
          class="test__block test__block_wraper bg-white-shadow test__item mt6"
          v-for="question in questions"
          :key="question.id"
        >
          <div style="display: flex; flex-direction: column; width: 100%">
            <div class="test__question-name mb5">
              {{ question.name }}
            </div>
            <div class="test__image mt5" v-if="question.image.link != null">
              <img :src="question.image.link" />
            </div>
            <VariantOneOutput
              v-if="question.typeAnswer == 'Один из списка'"
              :postQuestion="question"
            />
            <VariantInputOutput
              v-if="question.typeAnswer == 'Ввод текста'"
              :postQuestion="question"
            />
            <VariantFewOutput
              v-if="question.typeAnswer == 'Несколько из списка'"
              :postQuestion="question"
              @ready="question.checked = $event"
            />
            <VariantUnfoldOutput
              v-if="question.typeAnswer == 'Выпадающий список'"
              :postQuestion="question"
              @ready="question.checked = $event"
            />
            <VariantDateOutput
              v-if="question.typeAnswer == 'Дата'"
              :postQuestion="question"
              @ready="question.checked = $event"
            />
            <VariantTimeOutput
              v-if="question.typeAnswer == 'Время'"
              :postQuestion="question"
              @ready="question.checked = $event"
            />
          </div>
        </div>
      </div>
    </div>
    <InfoModal :message="infoMessage" />
    <SuccessModal v-if="showSuccess" :message="successMessage" />
    <SendFooter 
      :link="hash"
      type="test"
      :testName="testName"
      :isMine="isMine"
      :isAlreadySent="isAlreadySent"
      @send="sendTest"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import VariantOneOutput from "@/components/Tests/VariantOneOutput.vue";
import VariantInputOutput from "@/components/Tests/VariantInputOutput.vue";
import VariantFewOutput from "@/components/Tests/VariantFewOutput.vue";
import VariantUnfoldOutput from "@/components/Tests/VariantUnfoldOutput.vue";
import VariantDateOutput from "@/components/Tests/VariantDateOutput.vue";
import VariantTimeOutput from "@/components/Tests/VariantTimeOutput.vue";
import Header from "@/components/Header.vue";
import InfoModal from "@/components/InfoModal.vue";
import SuccessModal from "@/components/SuccessModal.vue";
import SendFooter from "@/components/SendFooter.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "Tests",
  data() {
    return {
      questions: [],
      testId: "",
      testName: "",
      testDescription: "",
      selected: [],
      infoMessage: {},
      image: {
        data: null,
        link: null,
      },
      testVideoLink: '',
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
    VariantOneOutput,
    VariantInputOutput,
    VariantFewOutput,
    VariantUnfoldOutput,
    VariantDateOutput, VariantTimeOutput,
    Header, InfoModal, SuccessModal,
    SendFooter, Loader
  },
  methods: {
    getRadioArray(variant) {
      return variant.filter((elem) => {
        return elem.name != null;
      });
    },

    sendTest() {
      let stop = false;
      this.questions.forEach((elem) => {
        if(elem.checked && typeof elem.checked == 'string') elem.checked = elem.checked.split('_')[0]
        if(elem.checked && (elem.checked instanceof Array)) {
          Object.keys(elem.checked).forEach((key) => {
            elem.checked[key] = elem.checked[key].split('_')[0]
          })
        }
        if(elem.isRequire && !elem.checked) {
          stop = true;
        }
      });
      if (stop) {
        this.infoMessage = {body: 'Вы ответили не на все вопросы', type: 'danger'}
        return;
      }
      for(let key in this.questions) {
        if(!this.questions[key]['checked']) {
          this.questions[key]['checked'] = []
        }
        if(!Array.isArray(this.questions[key]['checked'])) {
          this.questions[key]['checked'] = [this.questions[key]['checked']]
        }
      }
      this.questions = this.questions.filter((question) => {
        return question.checked.length > 0
      })
      axios
        .post("answers/send", {
          questions: this.questions,
          testId: this.testId,
          fingerprint: window.VISITOR_ID
        })
        .then(() => {
          this.successMessage = "Успешно сохранено"
          this.showSuccess = true
          setTimeout(() => {
            this.showSuccess = false
            location.reload()
          }, 2000)
        }); 
    },
  },
  mounted() {
    this.$store.commit('SHOW_LOADER')
    axios.get("test/getByHash/" + this.hash).then((res) => {
      res = res.data.data;

      this.testId = res.id;
      this.testName = res.testName;
      this.testVideoLink = res.videoLink;
      this.testDescription = res.description;
      this.image.link = res.imageLink;

      if(res.fingerprint == window.VISITOR_ID) this.isMine = true
      else this.isMine = false

      axios.post('test/dispatch/check', {
        testId: this.testId,
        fingerprint: window.VISITOR_ID,
      }).then((res) => {
        if(!res.data) {
          this.isAlreadySent = false
        }
        else {
          this.isAlreadySent = true
        }
      })
    });

    axios
      .get("test/questions/getByHash/" + this.hash)
      .then((res) => {
        res.data.data.forEach((element) => {
          let variants = JSON.parse(element.variants);
          this.questions.push({
            id: element.id,
            name: element.question,
            focused: false,
            variants: variants,
            typeAnswer: element.typeAnswer,
            isRequire: element.isRequire,
            image: {
              data: null,
              link: element.imageLink,
            },
          });
        });
      })
      .catch((e) => {
        console.log(e)
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
@import "@/common.blocks/form-radio_type-main.scss";
</style>
