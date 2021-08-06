<template>
  <div>
    <div v-for="question in postQuestions" :key="question.id">
      <div class="stats__question">{{ question.question || 'Вопрос' }}: </div>
      <div v-if="question.typeAnswer == 'Один из списка' || question.typeAnswer == 'Выпадающий список'"
           style="z-index:0"
      >
        <DoughnutChart
          :chartData="getChartData(question.answers)"
          :options="getOptions()"
          class="stats__doughnut chart-wraper mt6"
        />
      </div>

      <div v-if="question.typeAnswer == 'Несколько из списка'" style="z-index:0">
        <BarChart
          :chartData="getChartData(question.answers)"
          :options="getOptions2()"
          class="stats__bar chart-wraper mt6"
        />
      </div>
      <div
        v-if="
          question.typeAnswer == 'Ввод текста' ||
          question.typeAnswer == 'Дата' ||
          question.typeAnswer == 'Время'
        "
        class="mt5 mb5"
      >
        <div v-for="(answer, key) in question.answers" :key="key" class="stats__simple-answer mr5 mb5">
          {{ answer.name }} - {{ answer.count }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/Chart/BarChart.vue";
import DoughnutChart from "@/components/Chart/DoughnutСhart.vue";

export default {
  name: "TestStatOutput",
  props: ["postQuestions"],
  data() {
    return {
      chartData: [],
    };
  },
  components: {
    DoughnutChart, BarChart
  },
  methods: {
    getChartData(answers) {
      let dataArr = [];
      let labelsArr = [];
      answers.forEach((answer) => {
        dataArr.push(answer.count);
        if(answer.name.length > 15) answer.name = answer.name.substr(0, 15) + '...'
        labelsArr.push(answer.name);
      });

      let chartData = {
        datasets: [
          {
            label: 'Количество ответов',
            grouped: false,
            data: dataArr,
            skipNull: true,
            backgroundColor: [
              'rgba(2, 142, 155, 0.65)',
              'rgba(255, 65, 0, 0.65)',
              'rgba(255, 183, 0, 0.65)',
              'rgba(0, 187, 63, 0.65)',
              'rgba(102, 105, 251, 0.65)',
              'rgba(203, 0, 119, 0.65)',
              'rgba(73, 213, 219, 0.65)',
              'rgba(201, 203, 207, 0.65)'
            ],
          },
        ],
        labels: labelsArr,
      };
      return chartData;
    },

    getOptions() {
      return {responsive: true, maintainAspectRatio: false}
    },
    getOptions2() {
      return {
      responsive: true,
      maintainAspectRatio: false,
       scales: {
        yAxes: [{
          display: true,
          ticks: {
              beginAtZero: true,
              min: 0
          }
        }]
      },
        skipNull: true
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/stats.scss";
</style>
