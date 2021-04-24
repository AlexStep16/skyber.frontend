<template>
  <div>
    <div v-for="question in postQuestions" :key="question.id">
      <span class="test-stats__question">{{ question.question }}: </span><br />
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
        />
      </div>
      <div
        v-if="
          question.typeAnswer == 'Ввод текста' ||
          question.typeAnswer == 'Дата' ||
          question.typeAnswer == 'Время'
        "
      >
        <div v-for="(answer, key) in question.answers" :key="key" class="test-stats__simple-answer mr5 mt5">
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
            grouped: false,
            data: dataArr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
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
