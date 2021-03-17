<template>
  <div>
    <div v-for="question in postQuestions" :key="question.id">
      <span>{{ question.question }}: </span><br />
      <div
        v-if="
          question.typeAnswer == 'Один из списка' ||
          question.typeAnswer == 'Выпадающий список'
        "
      >
        <DoughnutChart
          :chartData="getChartData(question.variants)"
          :options="getOptions()"
          :styles="{ position: 'relative', height: '300px', justifyContent: 'left' }"
        />
        <!-- <div v-for="variant in question.variants" :key="variant.id">
          <span>{{ variant.name }}: {{ variant.percent }}%</span>
        </div> -->
      </div>

      <div
        v-if="
          question.typeAnswer == 'Ввод текста' ||
          question.typeAnswer == 'Несколько из списка' ||
          question.typeAnswer == 'Дата' ||
          question.typeAnswer == 'Время'
        "
      >
        <div v-for="(answer, key) in question.answers" :key="key">
          <span>{{ answer.name }} - {{ answer.count }}</span>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import DoughnutChart from "@/components/DoughnutСhart.vue";

export default {
  name: "TestStatOutput",
  props: ["postQuestions"],
  data() {
    return {
      chartData: [],
    };
  },
  components: {
    DoughnutChart,
  },
  methods: {
    getChartData(variants) {
      let dataArr = [];
      let labelsArr = [];
      variants.forEach((variant) => {
        dataArr.push(variant.count);
        labelsArr.push(variant.name);
      });

      let chartData = {
        datasets: [
          {
            data: dataArr,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
          },
        ],
        labels: labelsArr,
      };
      
      return chartData;
    },

    getOptions() {
      return {responsive: true, maintainAspectRatio: false}
    }
  },
  mounted() {},
};
</script>
