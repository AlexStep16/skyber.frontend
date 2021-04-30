<template>
  <div class="container flex flex-justify-center">
    <Header />
    <div class="main">
      <div class="stats bg-white-shadow">
        <h1 class="h1-default">{{ name }}</h1>
        <span class="stats__count">Количество отправлений: {{ countSub }}</span>
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
      chartData: {},
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
              variant.count = 0;
            });
            elem.variants = variants;
          });
          this.getTestAnswers();
        });
    },
    sortPollAnswers(pollAnswers) {
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

      return {
        simpleAnswersArr: simpleAnswersArr,
        countedAnsArr: countedAnsArr,
        countAll: countAll,
      };
    },

    getPollAnswers() {
      axios.get("pollAnswers/" + this.id).then((res) => {
        res = res.data;

        let sortAnswers = this.sortPollAnswers(res);

        this.pollAnsType = res.type;
        this.countPollAnswers = sortAnswers.countAll;
        this.pollAnswers = sortAnswers.countedAnsArr;
      });
    },

    getTestAnswers() {
      axios.get("answer/" + this.id).then((res) => {
        res = res.data.data;
        this.answers = res;

        this.questions.forEach((question) => {
          let answersArray = res.filter((answer) => {
            return answer.questionId == question.id;
          });
          if (
            question.typeAnswer == "Один из списка" ||
            question.typeAnswer == "Выпадающий список"
          ) {
            this.variantsTypeOne(answersArray, question);
          } else if (question.typeAnswer == "Несколько из списка") {
            this.variantsTypeFew(answersArray, question);
          } else if (
            question.typeAnswer == "Ввод текста" ||
            question.typeAnswer == "Дата" ||
            question.typeAnswer == "Время"
          ) {
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
        variant.count = countVariantFreq;
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
        let index = simpleAnswersArr.indexOf(answer.checked[0]);

        if (index !== -1) {
          countedAnsArr[index].count += 1;
        } else {
          simpleAnswersArr.push(answer.checked[0]);
          countedAnsArr.push({ name: answer.checked[0], count: 1 });
        }
      });

      question.answers = countedAnsArr;
    },
  },

  mounted() {
    axios
      .post("stats/", {hash: this.$route.params.hash, fingerprint: window.VISITOR_ID})
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
        if(e.response.status == 401) {
          this.$router.replace('/404')
        }
      });
  },
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/stats.scss";
</style>
