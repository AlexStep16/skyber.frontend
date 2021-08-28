<template>
  <div class="container flex flex-justify-center">
    <Header type='тесты' :send="settings.is_list ? true : false" @send="sendTest" :isAlreadySent="alreadySentCondition()" />
    <div class="main" ref="main">
      <div class="link-closed bg-white-shadow flex flex-center" v-if="alreadySentCondition()">
        <div class="flex mr5">
          <SuccessSVG />
        </div>
        <h4 class="link-closed__h4">
          Ваши результаты отправлены
        </h4>
      </div>
      <LinkClosed v-if="!settings.access_for_all && !alreadySentCondition()" from="test" type="link" />
      <LinkClosed v-else-if="settings.password_access && !alreadySentCondition()" from="test" type="password" @openTest="openTest" @wrongPassword="infoMessage  = {body: 'Неверный пароль', type: 'danger'}" />
      <div class="test" v-if="settings.access_for_all && !settings.password_access && !alreadySentCondition()">
        <TestAnswer :fakeLoader="fakeLoader" 
                    :totalScores="totalScores" 
                    :hash="hash" 
                    v-if="totalScores !== null"
                    :testName="test.name"
        />
        <div class="test__block_wraper test__fact-header" v-show="!startTest || this.settings.is_list">
          <div class="test__block bg-white-shadow test__header pt7 pb7">
            <h1 class="h1-test mt0 mb0">{{ test.name || 'Без названия' }}</h1>
            <div class="test__description dashed-list mt6" v-if="test.description" v-html="test.description"></div>
            <div class="test-video-wraper mt6" v-if="test.videoLink">
              <div class="modal modal_white absolute" v-if="!videoLoadDone">
                <Loader />
              </div>
              <youtube id="youtube" ref="youtube" :video-id="test.videoLink" class="test-video">
              </youtube>
            </div>
            <div :class="imageLoading ? 'test-image-preloader' : ''" v-if="showImagePreloader">
              <div class="test-image-loader modal modal_white absolute" v-if="imageLoading">
                <Loader />
              </div>
              <div class="test-image mt6" :style="{textAlign: img.align}" v-for="img in image.data" :key="img.id">
                <div class="test-image__wraper">
                  <img :src="img.original_url" :width="img.width" />
                </div>
              </div>
            </div>
            <button 
              class="test-start-button button button_type-index button_theme-purple mt7" 
              @click="startTest = true"
              v-if="!startTest"
            >Начать тест</button>
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
                {{ question.name ? question.name : 'Вопрос' }}
              </div>
              <div class="test-video-wraper mt6" v-if="question.videoLink">
                <!-- <div class="modal modal_white absolute" v-if="!videoLoadDone">
                  <Loader />
                </div> -->
                <youtube id="youtube" ref="youtube" :video-id="question.videoLink" class="test-video">
                </youtube>
              </div>
              <div class="test-image mt6" :style="{textAlign: img.align}" v-for="img in question.images" :key="img.id">
                <div class="test-image__wraper">
                  <img :src="img.original_url" :width="img.width" />
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


        <div v-if="!this.settings.is_list" v-show="startTest">
          <div class="test-progress-bar mt6" :title="(questionCounter + 1) + ' из ' + questions.length">
            <div class="test-progress-bar__slider" :style="{width: getProgressWidth() + 'px'}"></div>
          </div>
          <div
            class="test__block test__block_wraper bg-white-shadow test__item mt6"
            v-for="(question, key) in questions"
            :key="question.id"
            v-show="key == questionCounter"
          >
            <div style="display: flex; flex-direction: column; width: 100%">
              <div class="test-question-name mb0">
                {{ question.name ? question.name : 'Вопрос' }}
              </div>
              <div class="test-image mt6" :style="{textAlign: img.align}" v-for="img in question.images" :key="img.id">
                <div class="test-image__wraper">
                  <img :src="img.original_url" :width="img.width" :height="img.height" />
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
        <div class="test-control-panel flex flex-justify-between" v-if="!settings.is_list" v-show="startTest">
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
          Дальше ({{(questionCounter + 1) + ' из ' + questions.length}})
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
      :testName="test.name"
      :isMine="isMine"
      :isAlreadySent="isAlreadySent"
      :showSendMiniLoader="showSendMiniLoader"
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
import SuccessSVG from "/public/pictures/success.svg";

/* import SuccessModal from "@/components/SuccessModal.vue"; */
import SendFooter from "@/components/SendFooter.vue";
import Loader from "@/components/Loaders/Loader.vue";
import TestAnswer from "@/components/Scenarios/TestAnswer.vue";

export default {
  name: "Tests",
  data() {
    return {
      questions: [],
      test: {
        name: "",
        description: '',
        videoLink: '',
      },
      selected: [],
      infoMessage: {},
      image: {
        data: {},
        link: null,
        isLoading: false,
      },
      showSuccess: false,
      successMessage: '',
      isMine: false,
      isAlreadySent: false,
      hash: '',
      videoLoadDone: false,
      imageLoading: false,
      showImagePreloader: false,
      totalScores: null,
      settings: {},
      questionCounter: 0,
      currentQuestion: {},
      fakeLoader: true,
      successSended: false,
      startTest: false,
      showSendMiniLoader: false,
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
    TestAnswer, SuccessSVG
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
              let checked = el
              if(checked == variant.id && variant.scores) totalScores += parseInt(variant.scores)
            })
          } else if (elem.checked) {
            let checked = ''

            if(elem.checked) {
              checked = elem.checked
            }
            if(checked == variant.id && variant.scores) totalScores += parseInt(variant.scores)
          }
        })
        
      })
      this.totalScores = totalScores;
    },

    sendTest() {
      this.showSendMiniLoader = true
      if(this.successSended) return false;
      this.questions.forEach((elem) => {
        if((elem.isRequire && elem.checked === undefined)) {
          stop = true;
        }
        if(elem.typeAnswer === "Ввод текста") {
          if(elem.checked && elem.checked.length > 250) elem.checked = elem.checked.substr(0, 249)
          if(elem.checked && elem.checked.length === 0 && elem.isRequire) stop = true
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
          hash: this.hash,
          fingerprint: window.VISITOR_ID,
          hasStatistic: this.settings.has_statistic
        })
        .then(() => {
          this.fakeLoader = true
          let th = this
          setTimeout(() => {
            th.fakeLoader = false
          }, 3500)
          this.successSended = true
        }).finally(() => {
          this.showSendMiniLoader = false
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
    },
    alreadySentCondition() {
      if(this.isAlreadySent && !this.settings.is_resend) {
        return true
      }
      return false
    },
    getProgressWidth() {
      return Math.round(this.$refs['main'].clientWidth / this.questions.length) * (this.questionCounter + 1)
    }
  },
  beforeMount() {
    this.hash = this.$route.params.hash
    this.imageLoading = true
    this.showImagePreloader = true
      
    this.$store.commit('SHOW_LOADER')

    let getTestRequest = {
      hash: this.hash,
      fingerprint: window.VISITOR_ID,
    }
    axios.post("test", getTestRequest).then((res) => {
      res = res.data.data;
      this.settings = res.settings[0]
      if(this.settings.is_list) this.startTest = true
      
      this.test.name = res.testName ?? 'Без названия';
      this.test.videoLink = res.videoLink;
      this.test.description = res.description;
      for(let key in res.imageLink) {
        this.$set(this.image.data, key, res.imageLink[key])
      }
      
      this.imageLoading = false
      if(res.imageLink.length === 0) this.showImagePreloader = false

      if(res.fingerprint == window.VISITOR_ID) this.isMine = true
      else this.isMine = false


      axios
        .post('test/dispatch/check', {
          hash: this.hash,
          fingerprint: window.VISITOR_ID,
        })
        .then((res) => {
          if(!res.data) {
            this.isAlreadySent = false
          }
          else {
            this.isAlreadySent = true
          }
        })

    }).catch(() => {
      this.$router.replace('/list')
    });

    axios
      .post("test/questions", getTestRequest)
      .then((res) => {
        res.data.data.forEach((element) => {
          let variants = JSON.parse(element.variants);
          let images = []
          for(let key in element.images) {
            images[key] = element.images[key]
          }
          this.questions.push({
            id: element.id,
            name: element.question,
            focused: false,
            variants: variants,
            typeAnswer: element.typeAnswer,
            isRequire: element.isRequire,
            images: images,
            right_variants: element.right_variants,
            videoLink: element.videoLink,
            showAllRightVariants: false,
            wasSelected: false,
          });
        });
        if(this.questions.length > 0) {
          this.$set(this, 'currentQuestion', this.questions[0])
        }
        setTimeout(() => {
          this.$store.commit('HIDE_LOADER')
        },100)
      })
      .catch((e) => {
        console.log(e)
        this.$store.commit('HIDE_LOADER')
      })

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
  metaInfo() {
    return { 
        title: `${this.test.name} | Skyber`,
        meta: [
            { name: 'description', content:  `${this.test.description}`},
            { property: 'og:title', content: `${this.test.name} | Skyber`},
            { property: 'og:site_name', content: 'Skyber'},
            {property: 'og:type', content: 'website'},    
            {name: 'robots', content: 'index,nofollow'} 
        ]
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/link-closed.scss";

</style>
