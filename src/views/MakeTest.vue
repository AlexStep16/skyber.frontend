<template>
  <div class="container flex flex-justify-center">
    <Header type="test" />
    <div class="main">
      <div class="test-wrapper">
        <Settings :hash="test.hash" :settings="settings" />

        <div class="test inline-block mt7">
          <div class="test__block_wraper">

            <div class="side-panel inline-block">
              <div class="side-panel-inner pt6 pb6 flex flex-center flex-vertical" v-if="testFocused">
                <div class="side-panel-item pointer text-center" @click="addQuestion">
                  <AddSVG style="position:absolute" />
                </div>
                <div class="side-panel-item pointer text-center" @click="clickImage">
                  <img src="/pictures/image.svg" width="32px">
                </div>
                <div class="side-panel-item pointer text-center" @click="hideVideoBox = test.videoLink == null ? !hideVideoBox : hideVideoBox">
                  <img src="/pictures/video.svg" width="32px">
                </div>
              </div>
            </div>
            
            <div class="test__block bg-white-shadow test__header" @click="testFocuse">
              <form class="form form_type-test">
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Название теста"
                    class="input input_type-test input_type-test-header pb4 pt0"
                    v-model="test.name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Описание теста"
                    class="input input_type-test-small mt5"
                    v-model="test.description"
                  />
                </div>
                <div class="test-video-wraper mt6" v-if="test.videoLink">
                  <div class="modal modal_white absolute" v-if="!videoLoadDone">
                    <Loader />
                  </div>
                  <div class="test-video-menu pointer flex-center bg-white-shadow" @click="deleteVideo">
                    <img src="/pictures/trash.svg" width="21px" />
                  </div>
                  <youtube id="youtube" ref="youtube" :video-id="test.videoLink" class="test-video">
                  </youtube>
                </div>
                <div class="test-add-video-block flex flex-center mt5" v-if="!hideVideoBox">
                  <div class="test-add-video-block__modal flex flex-column">
                    <input type="text" class="input test-add-video-block__input" ref="linkInput" placeholder="Введите ссылку на YouTube видео">
                    <button class="button button_theme-blue test-add-video-block__button" @click.prevent="saveLink">Добавить</button>
                  </div>
                </div>
                <input
                  type="file"
                  name="testImage"
                  ref="imageInput"
                  multiple
                  @change="uploadImage"
                  hidden
                  v-if="image.link == null"
                />
                <div :class="imageLoading ? 'test-image-preloader' : ''" v-if="showImagePreloader">
                  <div class="test-image-loader modal modal_white absolute" v-if="imageLoading">
                    <Loader />
                  </div>
                  <div class="test-image mt6" v-for="(image, key) in image.data" :key="key">
                    <div class="test-image__wraper">
                      <img :src="image.result || image.original_url" />
                      <div class="modal-inner modal50 pointer flex flex-center">
                        <img src="/pictures/trash.svg" width="65px" @click="deleteImage(image)" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <draggable v-model="questions" @end="dragEnd" handle=".drag">
            <div
              class="test__block_wraper mt7"
              v-for="(question, key) in questions"
              :key="key"
              @click="questionFocus(question)"
            >
              <div class="side-panel inline-block" v-if="question.focused">
                <div class="side-panel-inner pt6 pb6 flex flex-center flex-vertical">
                  <div class="side-panel-item pointer" @click="addQuestion">
                    <AddSVG style="position:absolute" />
                  </div>
                  <div class="side-panel-item pointer" @click="clickQuestionImage(question.id)">
                    <img src="/pictures/image.svg" width="32px">
                  </div>
                  <div class="side-panel-item pointer" @click="clickQuestionVideo(question)">
                    <img src="/pictures/video.svg" width="32px">
                  </div>
                </div>
              </div>

              <template v-if="question.focused">
                <div class="test__block test__block_selected test__item bg-white-shadow">
                  <div
                    class="question-wrapper"
                    :ref="'question' + question.id"
                  >
                    <div class="question-flex">
                      <input
                        type="text"
                        name="names"
                        id="names"
                        class="test__input-question-name input input_type-option pl0"
                        placeholder="Напишите свой вопрос..."
                        v-model="question.name"
                      />
                      <div class="flex flex-center">
                        <span>
                          <img src="/pictures/move.svg" width="26px" class="drag pointer mr5" />
                        </span>
                        <span @click="copyQuestion(question)" class="pointer">
                          <img src="/pictures/copy.svg" width="21px" />
                        </span>
                        <span
                          @click="deleteQuestion(key, question.id)"
                          class="pointer ml5"
                        >
                          <img src="/pictures/trash.svg" width="21px" />
                        </span>
                      </div>
                    </div>
                    <!-- Блок с видео -->
                    <div class="test-video-wraper mt6" v-if="question.videoLink">
                      <!-- <div class="modal modal_white absolute" v-if="!question.videoLoadDone">
                        <Loader />
                      </div> -->
                      <div class="test-video-menu pointer flex-center bg-white-shadow" @click="questionDeleteVideo(question)">
                        <img src="/pictures/trash.svg" width="21px" />
                      </div>
                      <youtube id="youtube" ref="youtube" :video-id="question.videoLink" class="test-video">
                      </youtube>
                    </div>
                    <div class="test-add-video-block flex flex-center mt5" v-if="!question.hideVideoBox">
                      <div class="test-add-video-block__modal flex flex-column">
                        <input type="text" class="input test-add-video-block__input" v-model="question.preparateVideoLink" placeholder="Введите ссылку на YouTube видео">
                        <button class="button button_theme-blue test-add-video-block__button" @click.prevent="questionSaveLink(question)">Добавить</button>
                      </div>
                    </div>
                    <!-- Конец блока с видео -->

                    <!-- Блок с изображением -->
                    <input
                      type="file"
                      name="imageQuestion"
                      :ref="'question' + question.id"
                      hidden
                      @change="questionImage($event, question)"
                      v-if="question.image.link == null"
                    />
                    <div class="test-image" v-if="question.image.link != null || question.image.isLoading">
                      <div class="test-image__wraper">
                        <img :src="question.image.link" />
                        <div class="modal-inner modal50 pointer flex flex-center">
                          <img src="/pictures/trash.svg" width="65px" @click="questionImageDelete(question)" />
                        </div>
                      </div>
                      <div class="modal modal_white absolute" v-if="question.image.isLoading">
                        <Loader />
                      </div>
                    </div>
                    <!-- Конец блока с изображением -->

                    <MultiselectIcons :question="question" />

                    <VariantStandart
                      :postQuestion="question"
                      v-if="question.typeAnswer == 'Один из списка' || question.typeAnswer == 'Несколько из списка' || question.typeAnswer == 'Выпадающий список'"
                    />
                    <VariantInput
                      :postQuestion="question"
                      v-if="question.typeAnswer == 'Ввод текста'"
                    />
                    <VariantDate 
                      v-if="question.typeAnswer == 'Дата'"
                    />
                    <VariantTime
                      v-if="question.typeAnswer == 'Время'"
                    />
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="test__block test__item bg-white-shadow">
                  <div
                    class="test__block-inner-div"
                    v-if="question.name != null"
                  >
                    <div
                      class="test-question-name mb0"
                    >
                      {{ question.name }}
                    </div>
                    <div class="test-image mt6" v-if="question.image.link != null">
                      <div class="test-image__wraper">
                        <img :src="question.image.link" />
                      </div>
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
                    />
                    <VariantUnfoldOutput
                      v-if="question.typeAnswer == 'Выпадающий список'"
                      :postQuestion="question"
                    />
                    <VariantDateOutput
                      v-if="question.typeAnswer == 'Дата'"
                    />
                    <VariantTimeOutput
                      v-if="question.typeAnswer == 'Время'"
                    />
                  </div>
                  <div class="test-question-empty" v-else>Пустой вопрос</div>
                </div>
              </template>
            </div>
          </draggable>
          <div class="test__block test__empty bg-white-shadow mt6" v-if="questions.length == 0">
            Нет вопросов
          </div>
        </div>
      </div>
    </div>
    <MakeFooter type="test" :link="test.link" @save="saveTest" :wasChanged="wasChanged" />
    <InfoModal :message="infoMessage" />
    <SuccessModal 
      v-if="showSuccess" 
      :message="successMessage" 
      :link="test.hash" 
      type="test"
      :edit="true"
      @closeModal="showSuccess = false" 
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import Loader from "@/components/Loader.vue";

import MultiselectIcons from "@/components/Multiselect/MultiselectIcons";
import { getIdFromUrl } from 'vue-youtube'

import Header from "@/components/Header.vue";

import VariantStandart from "@/components/MakeTest/VariantStandart.vue";
import VariantInput from "@/components/MakeTest/VariantInput.vue";
import VariantInputOutput from "@/components/MakeTest/VariantInputOutput.vue";
import VariantUnfoldOutput from "@/components/MakeTest/VariantUnfoldOutput.vue";
import VariantOneOutput from "@/components/MakeTest/VariantOneOutput.vue";
import VariantFewOutput from "@/components/MakeTest/VariantFewOutput.vue";
import VariantDate from "@/components/MakeTest/VariantDate.vue";
import VariantDateOutput from "@/components/MakeTest/VariantDateOutput.vue";
import VariantTime from "@/components/MakeTest/VariantTime.vue";
import VariantTimeOutput from "@/components/MakeTest/VariantTimeOutput.vue";

import MakeFooter from "@/components/MakeFooter.vue";
import SuccessModal from "@/components/SuccessModal.vue";

import Settings from "@/components/Settings.vue";

import draggable from 'vuedraggable'

import AddSVG from '/public/Vectors/add32_new.svg'
import InfoModal from "@/components/InfoModal.vue";

export default {
  name: "MakeTest",
  props: ['hash'],
  data() {
    return {
      questions: [],
      test: {
        id: null,
        name: "",
        description: "",
        link: "",
        hash: "",
        videoLink: "",
      },
      image: {
        data: {},
        link: null,
        isLoading: false
      },
      sidebar: {
        position: 0
      },
      testFocused: true,
      hideVideoBox: true,
      fingerprint: window.VISITOR_ID,
      showSuccess: false,
      successMessage: 'Успешно сохранено',
      videoLoadDone: false,
      imageLoading: false,
      showImagePreloader: false,

      fastSaveTimeoutId: '',
      wasChanged: false,

      settings: {
        test_id: null,
        access_for_all: false,
        password_access: false,
        is_list: true,
        is_right_questions: false,
        is_wrong_questions: false,
        is_resend: false,
        is_reanswer: true,
        has_statistic: true,
        password: '',
        password_confirm: false,
      },
      infoMessage: {},
    };
  },
  components: {
    VariantStandart,
    VariantInput,
    VariantOneOutput,
    VariantInputOutput,
    VariantFewOutput,
    VariantUnfoldOutput, 
    VariantDateOutput, VariantDate,
    VariantTime, VariantTimeOutput,
    draggable,  Header, AddSVG,
    MakeFooter, SuccessModal,
    Loader, InfoModal, MultiselectIcons,
    Settings
  },
  computed: {
  },
  methods: {
    ...mapMutations(["SET_TEST_DRAFT", "CLEAR_TEST_DRAFT"]),

    addQuestion() {
      let name = null;
      let standartVariants = [{ id: 0, name: "Вариант 1", hasDescription: false}]; //Стартовое количество вариантов
      let questionToPost = {
        testId: this.test.id,
        variants: standartVariants,
        name: name,
        index: this.questions.length,
        typeAnswer: "Один из списка",
        isRequire: false,
        right_variants: [],
        videoLink: '',
        hideVideoBox: true
      };

      axios.post("test/question", questionToPost).then((res) => {
        let question = {
          id: res.data,
          name: name || 'Без названия',
          focused: false,
          typeAnswer: "Один из списка",
          standartVariants: standartVariants,
          index: this.questions.length,
          isRequire: false,
          image: {
            data: null,
            link: null,
            isLoading: false
          },
          right_variants: [],
          videoLink: '',
          hideVideoBox: true
        };

        this.questions.push(question);
        this.questionFocus(question);
      });
    },

    deleteQuestion(key, questionId) {
      axios.get("test/question/delete/" + questionId).then(() => {
        this.$delete(this.questions, key);
      });
    },

    questionFocus(question) {
      this.questions.forEach((element) => {
        if (element.id != question.id) {
          element.focused = false;
        }
      });
      question.focused = true;
      this.testFocused = false
    },

    saveTest(fastSave = false) {
      let stop = false
      if(this.settings.password_access && this.settings.password.length < 5 && !this.settings.password_confirm && !fastSave) {
        stop = true
        this.infoMessage = {body: 'Пароль должен быть больше 4 символов', type: 'danger'}
      }
      if(this.test.name == '' && !fastSave) {
        stop = true
        this.infoMessage = {body: 'Введите название теста', type: 'danger'}
      } 
      this.questions.forEach((question) => {
        if(!question.name && !fastSave) { 
          stop = true;
          this.questionFocus(question)
        }
        switch (question.typeAnswer) {
          case "Ввод текста":
            question.selectedVariants = [];
            break;
          default:
            question.selectedVariants = question.standartVariants;
            break;
        }
      });
      if(stop) this.infoMessage = {body: 'Введите название вопроса', type: 'danger'}
      let test = {
        questions: this.questions,
        testName: this.test.name || '',
        videoLink: this.test.videoLink || '',
        testDescription: this.test.description,
        testId: this.test.id,
        fingerprint: this.fingerprint,
        settings: this.settings
      };
      if(!stop) axios.post("test/save", test).then(() => {

        if(!fastSave) {
          if(this.test.hash == this.$store.state.testStore.draftHash) this.CLEAR_TEST_DRAFT()
          this.successMessage = "Успешно сохранено"
          this.showSuccess = true
        }
        else {
          this.wasChanged = false
        }
      });
    },

    uploadImage(event) {
      this.showImagePreloader = true
      this.imageLoading = true
      
      let files = event.target.files
      this.image.data = []
      const fd = new FormData();
      let count = 0
      for (let i in files) {

        if (Object.prototype.hasOwnProperty.call(files,i)) {
          fd.append(`testImage${count}`, files[i])
          fd.append(`imageType${count}`, files[i].type.split('/')[1])
          count++
        }
      }
      
      fd.append('countImages', count)
      fd.append("testHash", this.test.hash)
      
      if (!this.image.data) return;
      
      axios.post("test/upload", fd).then((res) => {
        this.image.data.push(res.data)
        this.imageLoading = false
      })
      .catch(() => {
        this.showImagePreloader = false
      });
      event.target.value = '';
    },

    deleteImage(image) {
      if(image.order) {
        axios.post("test/upload/delete", { testHash: this.test.hash, order: image.order }).then(() => {
          this.$delete(this.image.data, image.uuid);
          if(this.image.data.length === 0) this.showImagePreloader = false
        });
      }
      else {
        this.image.data.splice(image.index, 1)
      }
    },

    clickQuestionImage(id) {
      if(this.$refs['question' + id][0].localName == 'div') {
        this.$refs['question' + id][1].click()
      }
      else {
        this.$refs['question' + id][0].click()
      }
    },
    clickQuestionVideo(question) {
      if(!question.videoLink) {
        question.hideVideoBox = !question.hideVideoBox
      }
    },
    questionSaveLink(question) {
      question.videoLink = getIdFromUrl(question.preparateVideoLink)
      question.hideVideoBox = true
    },
    questionDeleteVideo(question) {
      question.videoLink = null
    },
    questionImage(event, question) {
      question.image.isLoading = true
      let fd = new FormData();
      fd.append("questionImage", event.target.files[0]);
      fd.append("id", question.id);

      axios.post("test/question/upload", fd).then(() => {
        question.image.data = event.target.files[0];
        question.image.link = URL.createObjectURL(event.target.files[0]);
        question.image.isLoading = false
      });
    },

    questionImageDelete(question) {
      axios
        .post("test/question/upload/delete", { id: question.id })
        .then(() => {
          question.image.link = null;
          question.image.data = null;
        });
    },
    dragEnd() {
      this.questions.forEach((question, index) => {
        question.index = index;
      })
    },
    saveLink() {
      this.test.videoLink = getIdFromUrl(this.$refs.linkInput.value)
      this.hideVideoBox = true
    },
    deleteVideo() {
      this.test.videoLink = null
    },
    //Mounted methods
    getTest(hash) {
      this.showImagePreloader = true
      this.imageLoading = true
      axios.post("test/", {hash: hash, fingerprint: this.fingerprint}).then((res) => {
        if(!res) {
          this.$router.push('/test/create')
        }
        
        res = res.data.data;
        this.settings = res.settings[0]

        this.test.id = res.id
        this.test.name = res.testName;
        this.test.videoLink = res.videoLink;
        this.test.description = res.description;
        this.test.link = "https://skyber.ru/tests/" + res.hash;
        
        for(let key in res.imageLink) {
          this.image.data[key] = res.imageLink[key]
        }
        
        this.imageLoading = false
        if(res.imageLink.length === 0) this.showImagePreloader = false
      }).catch(() => {
        let hashStore = this.$store.state.testStore.draftHash
        if(hashStore != null && hash == hashStore) {
          this.CLEAR_TEST_DRAFT()
        }
      }).finally(() => {
        this.$store.commit('HIDE_LOADER')
      });
    },
    getTestQuestions() {
      axios
        .get("test/questions/" + this.test.hash)
        .then((res) => {
          res.data.data.forEach((element) => {
            let selectedVariants = JSON.parse(element.variants);
            let standartVariants = [{ id: 0, name: "Вариант 1", hasDescription: false}];

            if (element.typeAnswer == "Ввод текста") {
              //
            } else {
              selectedVariants == null ? selectedVariants = [] : ''
              selectedVariants = selectedVariants.filter((elem) => {
                return elem.name !== null;
              });

              standartVariants = selectedVariants;
            }
            this.questions.push({
              id: element.id,
              name: element.question,
              focused: false,
              standartVariants: standartVariants,
              typeAnswer: element.typeAnswer,
              index: element.index,
              isRequire: element.isRequire,
              image: {
                data: null,
                link: element.imageLink,
                isLoading: false
              },
              right_variants: element.right_variants,
              videoLink: element.videoLink,
              hideVideoBox: element.videoLink !== null ? false : true
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    clickImage() {
      this.$refs.imageInput.click();
    },

    testFocuse() {
      let questionsKeys = Object.keys(this.questions)
      questionsKeys.forEach((key) => {
        this.questions[key].focused = false
      })
      this.testFocused = true;
    },

    copyQuestion(question) {
      let name = question.name;
      let standartVariants = question.standartVariants; //Стартовое количество вариантов
      let questionToPost = {
        testId: this.test.id,
        name: name || 'Без названия',
        focused: false,
        typeAnswer: question.typeAnswer,
        standartVariants: standartVariants,
        index: this.questions.length,
        isRequire: question.isRequire,
        image: question.image,
        right_variants: question.right_variants,
        videoLink: question.videoLink,
        hideVideoBox: true
      };

      axios.post("test/question", questionToPost).then((res) => {
        questionToPost.id = res.data

        this.questions.push(questionToPost);
        this.questionFocus(questionToPost);
      });
    },
  },

  watch: {
    test: {
      deep: true,
      handler() {
        this.wasChanged = true
      }
    },
    questions: {
      deep: true,
      handler() {
        this.wasChanged = true
      }
    },
    settings: {
      deep: true,
      handler() {
        this.wasChanged = true
      }
    }
  },

  mounted() {
    this.test.hash = this.hash
    this.$store.commit('SHOW_LOADER')
    if (this.test.hash && this.test.hash !== '') {
      this.getTest(this.test.hash);
      this.getTestQuestions()
    }

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

    let th = this
    this.fastSaveTimeoutId = setInterval(() => {
      if(th.wasChanged) th.saveTest(true)
    }, 3500)
  },
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/custom-multiselect.scss";

</style>

