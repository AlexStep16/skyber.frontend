<template>
  <div>
    <div v-for="question in postQuestions" :key="question.id">
      <div class="stats__question">{{ question.question }}: </div>
      <div
        v-if="
          question.typeAnswer == 'Один из списка' ||
          question.typeAnswer == 'Выпадающий список'
        "
        style="z-index:0"
      >
        <DoughnutChart
          :chartData="getChartData(question.variants)"
          :options="getOptions()"
          :styles="{ position: 'relative', height: '300px', justifyContent: 'left' }"
          class="chart-wraper mt6"
        />
      </div>

      <div
        v-if="
          question.typeAnswer == 'Несколько из списка'
        "
        style="z-index:0"
      >
        <BarChart
          :chartData="getChartData(question.answers, 'few')"
          :options="getOptions2()"
          :styles="{ position: 'relative', height: 'auto', justifyContent: 'left' }"
          class="chart-wraper mt6"
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
        <div v-for="(answer, key) in question.answers" :key="key" class="test-stats__simple-answer mr5">
          {{ answer.name }} - {{ answer.count }}
        </div>
      </div>
      <br />
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
    getChartData(variants, type = 'standard') {
      let dataArr = [];
      let labelsArr = [];
      if(type == 'standard') {
        variants.forEach((variant) => {
          dataArr.push(variant.count);
          labelsArr.push(variant.name);
        });
      }

      if(type == 'few') {
        variants.forEach((answer) => {
          dataArr.push(parseInt(answer.count));
          labelsArr.push(answer.name);
        });
      }

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
      if(type == 'few') {
        chartData.datasets[0].backgroundColor = [
          'rgba(2, 142, 155, 0.65)',
          'rgba(255, 65, 0, 0.65)',
          'rgba(255, 183, 0, 0.65)',
          'rgba(0, 187, 63, 0.65)',
          'rgba(102, 105, 251, 0.65)',
          'rgba(203, 0, 119, 0.65)',
          'rgba(73, 213, 219, 0.65)',
          'rgba(201, 203, 207, 0.65)'
        ]
      }
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
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/stats.scss";
</style>
