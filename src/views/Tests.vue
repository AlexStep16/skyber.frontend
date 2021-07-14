<template>
  <div class="container flex flex-justify-center">
    <Header type='test' />
    <div class="main">
      <LinkClosed v-if="!settings.access_for_all" from="test" type="link" />
      <LinkClosed v-else-if="settings.password_access" from="test" type="password" @openTest="openTest" />
      <div class="test" v-if="settings.access_for_all && !settings.password_access">
        <TestAnswer :fakeLoader="fakeLoader" 
                    :totalScores="totalScores" 
                    :hash="hash" 
                    v-if="totalScores !== null"
                    :testName="testName"
        />
        <div class="test__block_wraper">
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
            <div :class="imageLoading ? 'test-image-preloader' : ''" v-if="showImagePreloader">
              <div class="test-image-loader modal modal_white absolute" v-if="imageLoading">
                <Loader />
              </div>
              <div class="test-image mt6" v-for="(image, key) in image.data" :key="key">
                <div class="test-image__wraper">
                  <img :src="image.result || image.original_url" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.settings.is_list">
          <div
            class="test__block test__block_wraper bg-white-shadow test__item mt6"
            v-for="question in questions"
            :key="question.id"
          >
            <div style="display: flex; flex-direction: column; width: 100%">
              <div class="test-question-name mb0">
                {{ question.name }}
              </div>
              <div class="test-video-wraper mt6" v-if="question.videoLink">
                <!-- <div class="modal modal_white absolute" v-if="!videoLoadDone">
                  <Loader />
                </div> -->
                <youtube id="youtube" ref="youtube" :video-id="question.videoLink" class="test-video">
                </youtube>
              </div>
              <div class="test-image mt6" v-if="question.image.link != null">
                <div class="test-image__wraper">
                  <img :src="question.image.link" />
                </div>
              </div>
              <VariantOneOutput
                v-if="question.typeAnswer == 'Один из списка'"
                :postQuestion="question"
                :settings="settings"
              />
              <VariantInputOutput
                v-if="question.typeAnswer == 'Ввод текста'"
                :postQuestion="question"
              />
              <VariantFewOutput
                v-if="question.typeAnswer == 'Несколько из списка'"
                :postQuestion="question"
                :settings="settings"
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


        <div v-if="!this.settings.is_list">
          <div
            class="test__block test__block_wraper bg-white-shadow test__item mt6"
            v-for="(question, key) in questions"
            :key="question.id"
            v-show="key == questionCounter"
          >
            <div style="display: flex; flex-direction: column; width: 100%">
              <div class="test-question-name mb6">
                {{ question.name }}
              </div>
              <div class="test-image mt5" v-if="question.image.link != null">
                <div class="test-image__wraper">
                  <img :src="question.image.link" />
                </div>
              </div>
              <VariantOneOutput
                v-if="question.typeAnswer == 'Один из списка'"
                :postQuestion="question"
                :settings="settings"
              />
              <VariantInputOutput
                v-if="question.typeAnswer == 'Ввод текста'"
                :postQuestion="question"
              />
              <VariantFewOutput
                v-if="question.typeAnswer == 'Несколько из списка'"
                :postQuestion="question"
                :settings="settings"
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
        <div class="flex flex-justify-between" v-if="!settings.is_list">
          <button 
            class="button button_type-index button_theme-purple mt7" 
            @click="backQuestion"
            v-if="questionCounter !== 0"
          >
          Назад
          </button>
          <button
            class="button button_type-index button_theme-purple mt7" 
            @click="nextQuestion"
            v-if="nextButton()"
          >
          Дальше
          </button>
          <button
            class="button button_type-index button_theme-purple mt7" 
            @click="showAllRightVariantsMethod"
            v-if="answerButton()"
          >
          Ответить
          </button>
          <button 
            class="button button_type-index button_theme-purple mt7" 
            @click="sendTest();showAllRightVariantsMethod()"
            v-if="questionCounter === questions.length-1"
          >
          Готово
          </button>
        </div>
      </div>
    </div>
    <InfoModal :message="infoMessage" />
    <!-- <SuccessModal 
      v-if="showSuccess" 
      :message="successMessage" 
      type="test" 
      :link="hash"
      :edit="false"
      :resend="settings.is_resend"
      @resend="resend()"
    /> -->
    <SendFooter 
      v-if="this.settings.is_list && this.settings.access_for_all && !this.settings.password_access"
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
import LinkClosed from "@/components/LinkClosed.vue";
/* import SuccessModal from "@/components/SuccessModal.vue"; */
import SendFooter from "@/components/SendFooter.vue";
import Loader from "@/components/Loader.vue";
import TestAnswer from "@/components/Scenarios/TestAnswer.vue";

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
        data: {},
        link: null,
        isLoading: false
      },
      testVideoLink: '',
      showSuccess: false,
      successMessage: '',
      isMine: true,
      isAlreadySent: true,
      hash: this.$route.params.hash,
      videoLoadDone: false,
      imageLoading: false,
      showImagePreloader: false,
      totalScores: null,
      settings: {},
      questionCounter: 0,
      currentQuestion: {},
      fakeLoader: false,
    };
  },
  components: {
    VariantOneOutput,
    VariantInputOutput,
    VariantFewOutput,
    VariantUnfoldOutput,
    VariantDateOutput, VariantTimeOutput,
    Header, InfoModal, /* SuccessModal, */
    SendFooter, Loader, LinkClosed,
    TestAnswer
  },
  methods: {
    getRadioArray(variant) {
      return variant.filter((elem) => {
        return elem.name != null;
      });
    },
    scoresCounter() {
      let totalScores = 0
      this.questions.forEach((elem) => {
        elem.variants.forEach((variant) => {
          if (elem.checked && Array.isArray(elem.checked)) {
            elem.checked.forEach((el) => {
              let checked = el ? JSON.parse(el) : ''
              if(checked == variant.name && variant.scores) totalScores += parseInt(variant.scores)
            })
          } else if (elem.checked) {
            let checked = elem.checked ? JSON.parse(elem.checked) : ''
            if(checked == variant.name && variant.scores) totalScores += parseInt(variant.scores)
          }
        })
        
      })
      this.totalScores = totalScores;
    },

    sendTest() {
      this.questions.forEach((elem) => {
        if((elem.isRequire && elem.checked === undefined) || !elem.checked) {
          stop = true;
        }
      });
      if (stop) {
        this.infoMessage = {body: 'Вы ответили не на все вопросы', type: 'danger'}
        return false;
      }
      this.scoresCounter()
      if(this.settings.is_list && (this.settings.is_right_questions || this.settings.is_wrong_questions)) {
        this.questions.forEach(question => {
          question.showAllRightVariants = true
        })
      } 
      let stop = false;
      let questions = []
      this.questions.forEach((question, key) => {
        questions[key] = Object.assign({}, question)  // !!!!! в this.questions могут быть только простые объекты
      })

      for(let key in questions) {
        if(!questions[key]['checked']) {
          questions[key]['checked'] = []
        }
        if(!Array.isArray(questions[key]['checked'])) {
          questions[key]['checked'] = [questions[key]['checked']]
        }
      }
      questions = questions.filter((question) => {
        return question.checked.length > 0
      })
      axios
        .post("answers/send", {
          questions: questions,
          testId: this.testId,
          fingerprint: window.VISITOR_ID,
          hasStatistic: this.settings.has_statistic
        })
        .then(() => {
          this.fakeLoader = true
          let th = this
          setTimeout(() => {
            th.fakeLoader = false
          }, 3500)
          /* this.successMessage = "Успешно отправлено"
          this.showSuccess = true */
        });
      scroll({
        top: 0,
        behavior: "smooth"
      });
    },
    nextQuestion() {
      if (this.questions.length - 1 > this.questionCounter) this.questionCounter++
      this.$set(this, 'currentQuestion', this.questions[this.questionCounter])
    },
    backQuestion() {
      if (this.questionCounter > 0) this.questionCounter--
      this.$set(this, 'currentQuestion', this.questions[this.questionCounter])
    },
    openTest() {
      this.settings.password_access = false;
    },
    resend() {
      location.reload()
    },
    showAllRightVariantsMethod() {
      if(this.answerButton()) this.currentQuestion.showAllRightVariants = true
    },
    answerButton() {
      return this.currentQuestion.typeAnswer === 'Несколько из списка'
             && !this.currentQuestion.wasSelected
             && (this.settings.is_right_questions || this.settings.is_wrong_questions)
    },
    nextButton() {
      return !this.answerButton() && this.questionCounter !== this.questions.length - 1
    }
  },
  mounted() {
    this.imageLoading = true
    this.showImagePreloader = true

    this.$store.commit('SHOW_LOADER')
    axios.get("test/getByHash/" + this.hash).then((res) => {
      res = res.data.data;
      this.settings = res.settings[0]

      this.testId = res.id;
      this.testName = res.testName;
      this.testVideoLink = res.videoLink;
      this.testDescription = res.description;
      for(let key in res.imageLink) {
        this.image.data[key] = res.imageLink[key]
      }
      
      this.imageLoading = false
      if(res.imageLink.length === 0) this.showImagePreloader = false

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
            right_variants: element.right_variants,
            videoLink: element.videoLink,
            showAllRightVariants: false,
            wasSelected: false,
          });
        });
        if(this.questions.length > 0) {
          this.$set(this, 'currentQuestion', this.questions[0])
        }
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
