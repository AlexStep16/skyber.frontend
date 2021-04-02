<template>
  <div class="container body">
    <Header />
    <div class="main">
      <div class="test">
        <div class="test__block bg-white-shadow test__header pt7 pb7">
          <h1 class="h1-test">{{ testName }}</h1>
          <span>{{ testDescription }}</span>
          <div class="test__image" v-if="image.link != null">
            <img :src="image.link" />
          </div>
        </div>
        <div
          class="test__block test__block_wraper bg-white-shadow test__item mt6"
          v-for="question in questions"
          :key="question.id"
        >
          <div style="display: flex; flex-direction: column; width: 100%">
            <div class="test__question-name mb7">
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
        <button
          class="button button_type-index button_theme-blue mt6"
          @click="sendTest"
        >
          Отправить
        </button>
      </div>
    </div>
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

export default {
  name: "Tests",
  data() {
    return {
      questions: [],
      testId: "",
      testName: "",
      testDescription: "",
      selected: [],
      image: {
        data: null,
        link: null,
      },
    };
  },
  components: {
    VariantOneOutput,
    VariantInputOutput,
    VariantFewOutput,
    VariantUnfoldOutput,
    VariantDateOutput, VariantTimeOutput,
    Header,
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
        if(!Array.isArray(elem.checked)) elem.checked = [`${elem.checked}`]
        switch (elem.typeAnswer) {
          case "Один из списка":
            if (!elem.checked) {
              alert("Вы ответили не на все вопросы");
              stop = true;
            }
            break;
          case "Ввод текста":
            if (!elem.checked) {
              alert("Вы ответили не на все вопросы");
              stop = true;
            }
            break;
          case "Несколько из списка":
            if (!elem.checked) {
              alert("Вы ответили не на все вопросы");
              stop = true;
            }
            break;
        }
      });
      if (stop) return;
      for(let key in this.questions) {
        if(!Array.isArray(this.questions[key]['checked'])) {
          this.questions[key]['checked'] = [this.questions[key]['checked']]
        }
      }

      axios
        .post("answers/send", {
          questions: this.questions,
          testId: this.testId,
        })
        .then(() => {
          alert("Тест успешно отправлен");
          console.log(this.questions)
          this.$router.push({ name: "List" });
        });
    },
  },
  mounted() {
    axios.get("test/getByHash/" + this.$route.params.hash).then((res) => {
      res = res.data.data;

      this.testId = res.id;
      this.testName = res.testName;
      this.testDescription = res.description;
      this.image.link = res.imageLink;
    });

    axios
      .get("test/questions/getByHash/" + this.$route.params.hash)
      .then((res) => {
        res.data.forEach((element) => {
          let variants = JSON.parse(element.variants);

          this.questions.push({
            id: element.id,
            name: element.question,
            focused: false,
            variants: variants,
            typeAnswer: element.typeAnswer,
            image: {
              data: null,
              link: element.imageLink,
            },
          });
        });
      })
      .catch(() => {
        this.$router.push({ name: "Options" });
      });
  },
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-radio_type-main.scss";
</style>
