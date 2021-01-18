<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="test">
        <div class="test__block test__header">
          <form class="form form_type-test">
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Название теста"
                class="input input_type-test"
                v-model="testName"
              />
            </div>
            <div class="mt5">
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Описание теста"
                class="input input_type-test-small"
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
        <div
          class="test__block test__item mt6"
          v-for="(question, key) in questions"
          :key="question.id"
          @click="questionFocus(question)"
        >
          <template v-if="question.focused">
            <div
              style="
                flex-grow: 1;
                display: flex;
                align-items: center;
                flex-direction: column;
              "
            >
              <input
                type="text"
                name="names"
                id="names"
                class="input input_type-option pl0"
                placeholder="Напишите свой вопрос"
                v-model="question.name"
              />
              
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
                v-model="question.typeAnswer"
                :options="options"
              ></multiselect>
              <VariantOne
                :postQuestion="question"
                v-if="question.typeAnswer == 'Один из списка'"
              />
              <VariantInput
                :postQuestion="question"
                v-if="question.typeAnswer == 'Ввод текста'"
              />
            </div>
            <button
              class="button button_type-question button_theme-red"
              @click="deleteQuestion(key, question.id)"
            >
              Удалить
            </button>
          </template>

          <template v-else>
            <div
              style="display: flex; flex-direction: column"
              v-if="question.name != null"
            >
              <div style="flex-grow: 1; display: flex; align-items: center">
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
            </div>
            <div v-else>Пустой вопрос</div>
          </template>
        </div>
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
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import Header from "@/components/Header.vue";
import VariantOne from "@/components/MakeTest/VariantOne.vue";
import VariantInput from "@/components/MakeTest/VariantInput.vue";
import VariantOneOutput from "@/components/MakeTest/VariantOneOutput.vue";
import VariantInputOutput from "@/components/MakeTest/VariantInputOutput.vue";

/**
 * Структура data объекта questions:
 * radioVariants для режима 'Один из списка'
 * listVariants для режима 'Список'
 * и т.д
 */

export default {
  name: "MakeTest",
  data() {
    return {
      questions: [],
      testId: "",
      testName: "",
      testDescription: "",
      options: ["Один из списка", "Ввод текста"],
      image: {
        data: null,
        link: null,
      },
    };
  },
  components: {
    Multiselect,
    VariantOne,
    VariantInput,
    VariantOneOutput,
    VariantInputOutput,
    Header,
  },
  computed: {},
  methods: {
    addQuestion() {
      let name = null;
      let radioVariants = [{ id: 0, name: "Вариант 1" }];
      let questionToPost = {
        testId: this.testId,
        variants: radioVariants,
        name: name,
        typeAnswer: "Один из списка",
      };

      axios.post("test/question", questionToPost).then((res) => {
        let question = {
          id: res.data,
          name: name,
          focused: false,
          typeAnswer: "Один из списка",
          radioVariants: radioVariants,
          image: {
            data: null,
            link: null
          }
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
          case "Один из списка":
            question.selectedVariants = question.radioVariants;
            break;
          case "Ввод текста":
            question.selectedVariants = [];
            break;
          default:
            question.selectedVariants = question.radioVariants;
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
      let fd = new FormData()
      fd.append('questionImage', event.target.files[0])
      fd.append('id', question.id)

      axios.post('test/question/upload', fd).then(() => {
        question.image.data = event.target.files[0]
        question.image.link = URL.createObjectURL(event.target.files[0])
      })
    },

    questionImageDelete(question) {
      axios.post('test/question/upload/delete', {id: question.id}).then(() => {
        question.image.link = null;
        question.image.data = null;
      })
    }
  },

  mounted() {
    if (!this.$store.state.testStore.id) {
      this.$router.push({ name: "Options" });
    }

    this.testId = this.$store.state.testStore.id;

    axios.get("test/" + this.testId).then((res) => {
      res = res.data.data;

      this.testName = res.testName;
      this.testDescription = res.description;
      this.image.link = res.imageLink;
    });

    axios
      .get("test/questions/" + this.testId)
      .then((res) => {
        res.data.forEach((element) => {
          let selectedVariants = JSON.parse(element.variants);
          let radioVariants = [{ id: 0, name: "Вариант 1" }];

          if (element.typeAnswer == "Один из списка") {
            selectedVariants = selectedVariants.filter((elem) => {
              return elem.name !== null;
            });

            radioVariants = selectedVariants;
          } else if (element.typeAnswer == "Ввод текста") {
            //
          }

          this.questions.push({
            id: element.id,
            name: element.question,
            focused: false,
            radioVariants: radioVariants,
            typeAnswer: element.typeAnswer,
            image: {
              data: null,
              link: element.imageLink
            }
          });
        });
      })
      .catch((e) => {
        //this.$router.push({name: 'Options'})
        console.log(e);
      });
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
