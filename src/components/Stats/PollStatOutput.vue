<template>
  <div>
    <div>
      <PieChart
        :chartData="getChartData(postPollAnswers)"
        :options="getOptions()"
        :styles="{ position: 'relative', height: '300px', justifyContent: 'left' }"
        class="mt6"
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
    }
  },
};
</script>
