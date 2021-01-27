<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="stats">
        <h1 class="h1-default">{{ name }}</h1>
        <span>Количество отправлений: {{ countSub }}</span>
        <hr />
        <TestStatOutput :postQuestions="this.questions" v-if="type == 'test'" />
        <PollStatOutput
          :postPollAnswers="this.pollAnswers"
          :postCountPollAnswers="this.countPollAnswers"
          v-else-if="type == 'poll'"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Header from "@/components/Header.vue";
import TestStatOutput from "@/components/Stats/TestStatOutput.vue";
import PollStatOutput from "@/components/Stats/PollStatOutput.vue";

export default {
  name: "Stats",
  data() {
    return {
      name: "",
      id: "",
      type: "",
      countSub: "",
      questions: [],
      pollAnswers: [],
      pollAnsType: "",
      countPollAnswers: 0,
    };
  },
  computed: {},

  components: {
    Header,
    PollStatOutput,
    TestStatOutput,
  },

  methods: {
    getTestQuestions() {
      axios
        .get("test/questions/getByHash/" + this.$route.params.hash)
        .then((res) => {
          this.questions = res.data;
          this.questions.forEach((elem) => {
            let variants = JSON.parse(elem.variants);
            elem.answers = [];

            variants.forEach((variant) => {
              variant.percent = 0;
            });
            elem.variants = variants;
          });
          this.getTestAnswers();
        });
    },

    getPollAnswers() {
      axios.get("pollAnswers/" + this.id).then((res) => {
        res = res.data;

        let pollAnswers = res;
        this.pollAnsType = res.type;

        let simpleAnswersArr = [];
        let countedAnsArr = [];
        let countAll = 0;

        pollAnswers.forEach((answer) => {
          answer = JSON.parse(answer.answers);
          answer.forEach((elem) => {
            let index = simpleAnswersArr.indexOf(elem);
            if (index === -1) {
              simpleAnswersArr.push(elem);
              countedAnsArr.push({ answer: elem, count: 1 });
            } else {
              countedAnsArr[index].count += 1;
            }
            countAll++;
          });
        });

        this.countPollAnswers = countAll;
        this.pollAnswers = countedAnsArr;
      });
    },

    getTestAnswers() {
      axios.get("answer/" + this.id).then((res) => {
        res = res.data;
        this.answers = res;

        this.questions.forEach((question) => {
          let answersArray = res.filter((answer) => {
            return answer.questionId == question.id;
          });
          if (question.typeAnswer == "Один из списка") {
            this.variantsTypeOne(answersArray, question);
          } else if (question.typeAnswer == "Несколько из списка") {
            this.variantsTypeFew(answersArray, question);
          } else if (question.typeAnswer == "Ввод текста") {
            this.variantsTypeInput(answersArray, question);
          }
        });
      });
    },

    variantsTypeOne(answersArray, question) {
      question.variants.forEach((variant) => {
        let countVariantFreq = answersArray.filter((answer) => {
          return answer.checked == variant.name;
        }).length;
        variant.percent = (
          (countVariantFreq / answersArray.length) *
          100
        ).toFixed(1);
        answersArray.length == 0 ? (variant.percent = 0) : "";
      });
    },

    variantsTypeFew(answersArray, question) {
      let simpleAnswersArr = [];
      let countedAnsArr = [];

      answersArray.forEach((answer) => {
        answer.checked.forEach((elem) => {
          let index = simpleAnswersArr.indexOf(elem);
          if (index === -1) {
            simpleAnswersArr.push(elem);
            countedAnsArr.push({ name: elem, count: 1 });
          } else {
            countedAnsArr[index].count += 1;
          }
        });
      });
      question.answers = countedAnsArr;
    },

    variantsTypeInput(answersArray, question) {
      let simpleAnswersArr = [];
      let countedAnsArr = [];

      answersArray.forEach((answer) => {
        let index = simpleAnswersArr.indexOf(answer.checked);

        if (index !== -1) {
          countedAnsArr[index].count += 1;
        } else {
          simpleAnswersArr.push(answer.checked);
          countedAnsArr.push({ name: answer.checked, count: 1 });
        }
      });

      question.answers = countedAnsArr;
    },
  },

  mounted() {
    axios
      .get("stats/" + this.$route.params.hash)
      .then((res) => {
        res = res.data.data;
        let name = res.testName ? res.testName : res.pollName;

        this.name = name;
        this.id = res.id;
        this.type = res.testName ? "test" : "poll";
        this.countSub = res.countSub;

        if (this.type == "test") {
          this.getTestQuestions();
        } else if (this.type == "poll") {
          this.getPollAnswers();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/stats.scss";
</style>
