<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="flex">
        <div class="side-panel flex flex-center flex-vertical pt6 pb6">
          <div>
            <img src="/pictures/add.svg" width="36px" />
          </div>
        </div>
        <div class="test ml5">
          <div class="test__block test__header">
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
              <input
                type="file"
                name="image"
                @change="uploadImage"
                v-if="image.link == null"
              />
              <button
                class="button button_type-question button_theme-red"
                @click.prevent="deleteImage"
                v-if="image.link != null"
              >
                Удалить изображение
              </button>
              <div class="test__image" v-if="image.link != null">
                <img :src="image.link" />
              </div>
            </form>
          </div>
          <draggable v-model="questions" @end="dragEnd" handle=".drag">
            <div
              :class="question.focused ? 'test__block test__block_selected test__item mt8' : 'test__block test__item mt8'"
              v-for="question in questions"
              :key="question.index"
              @click="questionFocus(question)"
            >
              <!-- <div class="drag">
                <img src="/pictures/iconfinder_move_2561476.svg" width="32">
              </div> -->
              <template v-if="question.focused">
                <div
                  style="
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                  "
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
                        <img src="/pictures/copy.svg" width="21px" />
                      </span>
                      <span
                        @click="deleteQuestion(question.index, question.id)"
                        class="ml5"
                      >
                        <img src="/pictures/trash.svg" width="21px" />
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    name="image"
                    @change="questionImage($event, question)"
                    v-if="question.image.link == null"
                  />
                  <button
                    class="button button_type-question button_theme-red"
                    @click.prevent="questionImageDelete(question)"
                    v-if="question.image.link != null"
                  >
                    Удалить изображение
                  </button>
                  <div class="test__image" v-if="question.image.link != null">
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
              </template>

              <template v-else>
                <div
                  style="display: flex; flex-direction: column"
                  v-if="question.name != null"
                >
                  <div
                    class="test__question-name mb7"
                  >
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
              </template>
            </div>
          </draggable>
          <div class="test__block test__empty mt6" v-if="questions.length == 0">
            Нет вопросов
          </div>

          <div style="display: flex; justify-content: space-between" class="mt8">
            <button
              class="button button_type-index button_theme-green"
              @click="addQuestion"
            >
              Добавить вопрос
            </button>
            <button
              class="button button_type-index button_theme-blue"
              @click="saveTest"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";

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

import draggable from 'vuedraggable'

export default {
  name: "MakeTest",
  data() {
    return {
      questions: [],
      testId: "",
      testName: "",
      testDescription: "",
      options: ["Один из списка", "Ввод текста", "Несколько из списка", "Выпадающий список", "Дата", "Время"],
      image: {
        data: null,
        link: null,
      },
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
    draggable,  Header,
  },
  computed: {},
  methods: {
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
          name: name,
          focused: false,
          typeAnswer: "Один из списка",
          standartVariants: standartVariants,
          index: this.questions.length,
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
        this.questions.splice(key, 1);
      });
    },

    questionFocus(question) {
      this.questions.forEach((element) => {
        if (element.id != question.id) {
          element.focused = false;
        }
      });
      question.focused = true;
    },

    saveTest() {
      this.questions.forEach((question) => {
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
        testName: this.testName,
        testDescription: this.testDescription,
        testId: this.testId,
      };
      axios.post("test/save", test).then(() => {
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
    //Mounted methods
    getTest() {
      axios.get("test/" + this.testId).then((res) => {
        res = res.data.data;

        this.testName = res.testName;
        this.testDescription = res.description;
        this.image.link = res.imageLink;
      });
    },
    getTestQuestions() {
      axios
        .get("test/questions/" + this.testId)
        .then((res) => {
          res.data.forEach((element) => {
            let selectedVariants = JSON.parse(element.variants);
            let standartVariants = [{ id: 0, name: "Вариант 1" }];

            if (element.typeAnswer == "Ввод текста") {
              //
            } else {
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
  },

  mounted() {
    if (!this.$store.state.testStore.id) {
      this.$router.push({ name: "Options" });
    }

    this.testId = this.$store.state.testStore.id;

    this.getTest();
    this.getTestQuestions();
  },
};
</script>

<style lang="scss" scoped>
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
