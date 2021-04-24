<template>
  <div>
    <div>
      <PieChart
        :chartData="getChartData(postPollAnswers)"
        :options="getOptions()"
        :styles="{ position: 'relative', height: '300px', justifyContent: 'left' }"
      />
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Chart/PieChart.vue";

export default {
  name: "PollStatOutput",
  props: ["postPollAnswers", "postCountPollAnswers"],
  data() {
    return {
      pollAnswers: null
    }
  },
  components: {
    PieChart
  },
  methods: {
    getChartData(answers) {
      let dataArr = [];
      let labelsArr = [];

      answers.forEach((answer) => {
        dataArr.push(answer.count);
        labelsArr.push(answer.answer);
      });

      let chartData = {
        datasets: [
          {
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
    }
  },
};
</script>
