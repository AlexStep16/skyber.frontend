<template>
  <div class="container">
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
                type="text"
                class="input input_type-test-small"
                placeholder="Напишите здесь вариант ответа"
                v-model="variant.name"
                v-for="(variant, index) in question.radioVariants"
                :key="variant.id"
                @keyup="addVariant(question, variant.id)"
                @focusout="checkIsEmpty(variant, index)"
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
            <div style="display: flex; flex-direction: column">
              <div style="flex-grow: 1; display: flex; align-items: center">
                {{ question.name }}
              </div>
              <div class="form_type-radio mt5">
                <div
                  class="form_radio"
                  v-for="variant in getRadioArray(question.radioVariants)"
                  :key="variant.id"
                >
                  <input
                    :id="`radio${variant.id}`"
                    type="radio"
                    name="radio"
                    :value="variant.name"
                  />
                  <label :for="`radio${variant.id}`">{{ variant.name }}</label>
                </div>
              </div>
            </div>
          </template>
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
//import RegisterForm from '@/components/RegisterForm.vue';
import axios from "axios";

export default {
  name: "MakeTest",
  data() {
    return {
      questions: [],
      testId: "",
      testName: "",
      testDescription: "",
    };
  },
  components: {},
  computed: {},
  methods: {
    getRadioArray(variant) {
      return variant.filter((elem) => {
        return elem.name != null;
      });
    },
    addQuestion() {
      let name = "Введите название";
      let radioVariant = [{ id: 0, name: "Вариант 1" }];
      let question = {
        testId: this.testId,
        radioVariant: radioVariant,
        name: name,
      };

      axios.post("test/question", question).then((res) => {
        this.questions.push({
          id: res.data,
          name: name,
          focused: false,
          radioVariants: radioVariant,
        });
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
      if (
        question.radioVariants.length == 1 &&
        question.radioVariants[0].name != null
      ) {
        question.radioVariants.push({id: 1, name: null})
      }
    },

    addVariant(question, id) {
      let variant = question.radioVariants;

      if (variant[id].name == "") return;

      if (++id == variant.length) {
        variant.push({
          id: variant.length,
          name: "Вариант " + id,
        });
      }
    },

    checkIsEmpty(variant, index) {
      if (variant.name == "") {
        variant.name = "Вариант " + index;
      }
    },

    saveTest() {
      let test = {
        questions: this.questions,
        testName: this.testName,
        testDescription: this.testDescription,
        testId: this.testId,
      };
      axios.post("test/save", test).then(() => {
        console.log("Succeed save");
      });
    },
  },

  mounted() {
    if (!this.$store.state.testStore.id) {
      this.$router.push({ name: "Options" });
    }

    this.testId = this.$store.state.testStore.id;

    axios.get("test/" + this.testId).then((res) => {
      this.testName = res.data.data.testName;
      this.testDescription = res.data.data.description;
    });

    axios
      .get("test/questions/" + this.testId)
      .then((res) => {
        res.data.forEach((element) => {
          let radioVariants = JSON.parse(element.radio_variants);

          radioVariants = radioVariants.filter((elem) => {
            return elem.name !== null;
          });
          radioVariants.push({ id: radioVariants.length, name: null });

          this.questions.push({
            id: element.id,
            name: element.question,
            focused: false,
            radioVariants: radioVariants,
          });
        });
      })
      .catch((e) => {
        console.log(e);
        //this.$router.push({name: 'Options'})
      });
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-radio_type-main.scss";
</style>
