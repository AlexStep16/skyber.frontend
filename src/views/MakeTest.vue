<template>
  <div class="container body">
    <Header />
    <div class="main">
      <div>
        <div class="test inline-block">
          <div class="test__block_wraper">
            <div class="side-panel inline-block">
              <div class="side-panel-inner pt6 pb6 flex flex-center flex-vertical" v-if="testFocused">
                <div class="pointer text-center" @click="addQuestion">
                  <AddSVG />
                </div>
                <div class="pointer mt6 text-center" @click="clickImage">
                  <img src="/pictures/image.svg" width="32px">
                </div>
                <div class="pointer mt6 text-center" @click="hideVideoBox = !hideVideoBox">
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
                    class="input input_type-test input_type-test-header"
                    v-model="testName"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Описание теста"
                    class="input input_type-test-small mt5"
                    v-model="testDescription"
                  />
                </div>
                <youtube v-if="testVideoLink" :video-id="testVideoLink" class="test-video mt6">
                </youtube>
                <div class="test-add-video-block flex flex-center" v-if="!hideVideoBox">
                  <div class="test-add-video-block__modal flex flex-column">
                    <input type="text" class="input" ref="linkInput" placeholder="Введите ссылку на YouTube видео">
                    <button class="button button-theme-blue" @click.prevent="saveLink">Добавить</button>
                  </div>
                </div>
                <input
                  type="file"
                  name="image"
                  ref="imageInput"
                  @change="uploadImage"
                  hidden
                  v-if="image.link == null"
                />
                <div class="test__image" v-if="image.link != null">
                  <div class="modal modal50 pointer flex flex-center">
                    <img src="/pictures/trash.svg" width="65px" @click="deleteImage" />
                  </div>
                  <img :src="image.link" />
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
                  <div class="pointer text-center" @click="addQuestion">
                    <AddSVG />
                  </div>
                  <div class="pointer mt6 text-center" @click="clickQuestionImage(question.id)">
                    <img src="/pictures/image.svg" width="32px">
                  </div>
                  <div class="mt6 text-center">
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
                        class="input input_type-option pl0"
                        placeholder="Напишите свой вопрос"
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
                    <input
                      type="file"
                      name="imageQuestion"
                      :ref="'question' + question.id"
                      hidden
                      @change="questionImage($event, question)"
                      v-if="question.image.link == null"
                    />
                    <div class="test__image" v-if="question.image.link != null">
                      <div class="modal modal50 pointer flex flex-center">
                        <img src="/pictures/trash.svg" width="65px" @click="questionImageDelete(question)" />
                      </div>
                      <img :src="question.image.link" />
                    </div>

                    <multiselect
                      :allow-empty="false"
                      :multiple="false"
                      v-model="question.typeAnswer"
                      :options="options"
                      selectLabel=""
                      selectedLabel=""
                      deselectLabel=""
                      :placeholder="'Выберите тип ответа'"
                      class="mt5 mb5"
                    ></multiselect>
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
                    style="display: flex; flex-direction: column"
                    v-if="question.name != null"
                  >
                    <div
                      class="test__question-name mb7"
                    >
                      {{ question.name }}
                    </div>
                    <div class="test__image mt5 mb7" v-if="question.image.link != null">
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
                  <div v-else>Пустой вопрос</div>
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
    <MakeFooter :link="testLink" @saveTest="saveTest" />
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import { mapMutations } from "vuex";

import Multiselect from "vue-multiselect";
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

import draggable from 'vuedraggable'

import AddSVG from '../../public/Vectors/add32.svg'

export default {
  name: "MakeTest",
  data() {
    return {
      questions: [],
      testId: "",
      testName: "",
      testDescription: "",
      testLink: "",
      options: ["Один из списка", "Ввод текста", "Несколько из списка", "Выпадающий список", "Дата", "Время"],
      image: {
        data: null,
        link: null,
      },
      sidebar: {
        position: 0
      },
      testFocused: true,
      testVideoLink: '',
      hideVideoBox: true
    };
  },
  components: {
    Multiselect,
    VariantStandart,
    VariantInput,
    VariantOneOutput,
    VariantInputOutput,
    VariantFewOutput,
    VariantUnfoldOutput, 
    VariantDateOutput, VariantDate,
    VariantTime, VariantTimeOutput,
    draggable,  Header, AddSVG,
    MakeFooter
  },
  computed: {},
  methods: {
    ...mapMutations(["SET_TEST", "SET_POLL", "CLEAR_TEST"]),
    addQuestion() {
      let name = null;
      let standartVariants = [{ id: 0, name: "Вариант 1" }]; //Стартовое количество вариантов
      let questionToPost = {
        testId: this.testId,
        variants: standartVariants,
        name: name,
        index: this.questions.length,
        typeAnswer: "Один из списка",
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
          },
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

    saveTest() {
      let stop = false
      this.questions.forEach((question) => {
        if(!question.name) { 
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
      let test = {
        questions: this.questions,
        testName: this.testName || 'Без названия',
        videoLink: this.testVideoLink || '',
        testDescription: this.testDescription,
        testId: this.testId,
      };
      if(!stop) axios.post("test/save", test).then(() => {
        this.$router.push({ name: "List" });
      });
    },

    uploadImage(event) {
      this.image.data = event.target.files[0];
      const fd = new FormData();
      this.image.data != undefined
        ? fd.append("testImage", this.image.data)
        : "";
      fd.append("id", this.testId);

      if (!this.image.data) return;

      axios.post("test/upload", fd).then((res) => {
        this.image.link = res.data.image;
      });
    },

    deleteImage() {
      axios.post("test/upload/delete", { id: this.testId }).then(() => {
        this.image.link = null;
      });
    },

    clickQuestionImage(id) {
      if(this.$refs['question' + id][0].localName == 'div') {
        this.$refs['question' + id][1].click()
      }
      else {
        this.$refs['question' + id][0].click()
      }
    },
    questionImage(event, question) {
      let fd = new FormData();
      fd.append("questionImage", event.target.files[0]);
      fd.append("id", question.id);

      axios.post("test/question/upload", fd).then(() => {
        question.image.data = event.target.files[0];
        question.image.link = URL.createObjectURL(event.target.files[0]);
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
        console.log(question)
      })
    },
    saveLink() {
      this.testVideoLink = getIdFromUrl(this.$refs.linkInput.value)
      this.hideVideoBox = true
    },
    //Mounted methods
    getTest(id) {
      axios.get("test/" + id).then((res) => {
        if(!res) {
          this.CLEAR_TEST()
          location.reload()
        }
        res = res.data.data;
        
        this.testName = res.testName;
        this.testVideoLink = res.videoLink;
        this.testDescription = res.description;
        this.testLink = "https://skyber.ru/test/" + res.hash;
        this.image.link = res.imageLink;
      }).catch((error) => {
        if(error.response.status == 404) {
          this.CLEAR_TEST()
          location.reload()
        }
      });
    },
    getTestQuestions() {
      axios
        .get("test/questions/" + this.testId)
        .then((res) => {
          res.data.data.forEach((element) => {
            let selectedVariants = JSON.parse(element.variants);
            let standartVariants = [{ id: 0, name: "Вариант 1" }];

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
              },
            });
          });
        })
        .catch((e) => {
          //this.$router.push({name: 'Options'})
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
        testId: this.testId,
        variants: standartVariants,
        name: name,
        index: this.questions.length,
        typeAnswer: question.typeAnswer,
        isRequire: question.isRequire
      };

      axios.post("test/question", questionToPost).then((res) => {
        let Question = {
          id: res.data,
          name: name || 'Без названия',
          focused: false,
          typeAnswer: question.typeAnswer,
          standartVariants: standartVariants,
          index: questionToPost.index,
          isRequire: question.isRequire,
          image: {
            data: null,
            link: null,
          },
        };

        this.questions.push(Question);
        this.questionFocus(Question);
      });
    }
  },

  mounted() {
    if (!store.getters['auth/authenticated'] && !this.$store.state.testStore.id) {
      axios
        .post("test/create", this.form)
        .then((res) => {
          this.testId = res.data.data.id;
          this.SET_TEST({id: res.data.data.id});
          this.getTest(res.data.data.id);
          this.getTestQuestions()
        })
    }
    else if (!store.getters['auth/authenticated'] && this.$store.state.testStore.id) {
      axios.post("test/checkIp", {test_id: this.$store.state.testStore.id, }).then((res) => {
        if(res.data) {
          this.testId = this.$store.state.testStore.id;
          this.getTest(this.testId);
          this.getTestQuestions();
        }
        else {
          axios
          .post("test/create", this.form)
          .then((res) => {
            this.testId = res.data.data.id;
            this.SET_TEST({id: res.data.data.id});
            this.getTest(res.data.data.id);
            this.getTestQuestions()
          })
        }
      });
    }
    else if (store.getters['auth/authenticated'] && this.$store.state.testStore.id) {
      this.testId = this.$store.state.testStore.id;
      this.getTest(this.testId);
      this.getTestQuestions()
    }
    else if (store.getters['auth/authenticated'] && !this.$store.state.testStore.id) {
      axios
        .post("test/create", this.form)
        .then((res) => {
          this.testId = res.data.data.id;
          this.SET_TEST({id: res.data.data.id});
          this.getTest(res.data.data.id);
          this.getTestQuestions()
        })
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-radio_type-main.scss";

</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>

.multiselect__option--selected.multiselect__option--highlight, .multiselect__option--highlight {
    background: #6699ff;
}

.multiselect__option--selected {
    background: #ffffff;
    color: #6699ff;
    font-weight: 700;
}
</style>
