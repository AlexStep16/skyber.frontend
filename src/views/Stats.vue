<template>
  <div class="container flex flex-justify-center">
    <Header type="статистика" />
    <div class="main">
      <div class="stats bg-white-shadow">
        <div class="stats-header flex flex-align-center">
          <div class="stats-header__name h1-default mr5">{{ name }}</div>
          <span class="stats__count">Количество отправлений: {{ countSub }}</span>
        </div>
        <div class="stats-body">
          <div class="stats-empty flex flex-center" v-if="questionsFilter().length === 0">
            <span class="stats-empty__span">На данный тест ещё нет статистики</span>
          </div>
          <TestStatOutput :postQuestions="questionsFilter()" v-if="type == 'test'" />
          <!-- <PollStatOutput
            :postPollAnswers="this.pollAnswers"
            :postCountPollAnswers="this.countPollAnswers"
            v-else-if="type == 'poll'"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Header from "@/components/Header.vue";
import TestStatOutput from "@/components/Stats/TestStatOutput.vue";
//import PollStatOutput from "@/components/Stats/PollStatOutput.vue";

export default {
  name: "Stats",
  data() {
    return {
      name: "",
      id: "",
      type: "",
      countSub: "",
      questions: [],
      /* pollAnswers: [],
      pollAnsType: "",
      countPollAnswers: 0, */
      chartData: {},
    };
  },

  components: {
    Header,
    //PollStatOutput,
    TestStatOutput,
  },

  methods: {
    getTestQuestions() {
      axios
        .get("test/questions/getByHash/" + this.$route.params.hash)
        .then((res) => {
          this.questions = res.data.data;
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
            return answer.questionId === question.id;
          });
          this.variantsPreparation(answersArray, question);
        });
      });
    },

    variantsPreparation(answersArray, question) {
      let simpleAnswersArr = [];
      let countedAnsArr = [];

      answersArray.forEach((answer) => {
        answer.checked.forEach((elem) => {
          let index = simpleAnswersArr.indexOf(elem);
          if (index === -1) {
            simpleAnswersArr.push(elem);
            countedAnsArr.push({
              name: typeof elem === 'number' ? this.getVariantNameById(question, elem) : elem,
              count: 1
            });
          } else {
            countedAnsArr[index].count += 1;
          }
        });
      });

      question.answers = countedAnsArr;
    },

    getVariantNameById(question, id) {
      let name = ''
      question.variants.forEach((variant) => {
        if(variant.id === id) name = variant.name
      })
      return name
    },

    questionsFilter() {
      let arr = []
      this.questions.forEach((question) => {
        let total = 0
        if(question.answers) {
          question.answers.forEach((answer) => {
            total += answer.count
          })
        }
        if(total > 0) arr.push(question)
      })
      return arr
    }
  },

  beforeMount() {
    this.$store.commit('SHOW_LOADER')
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
      }).finally(() => {
        this.$store.commit('HIDE_LOADER')
      });
  },
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/stats.scss";
</style>
