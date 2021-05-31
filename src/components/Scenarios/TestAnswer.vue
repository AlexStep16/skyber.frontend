<template>
  <div class="scenario test__block bg-white-shadow">
    <h2 class="scenario__header-preview mt0">{{ scenario.header }}</h2>
    <div class="scenario__description" v-html="scenario.description"></div>
    <img class="scenario__image" :src="scenario.image">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'TestAnswer',
  props: ['totalScores', 'hash'],
  data() {
    return {
      scenario: {
        name: '',
        description: '',
        header: '',
        image: '',
      },
      scenarios: [],
    }
  },
  components: {
  },
  methods: {
    getScenario() {
      axios.get('scenarios/' + this.hash).then(res => {
        this.scenarios = res.data.data
        this.scenarios.forEach((scenario) => {
          let bigger = null;
          let less = null;
          let rangeList = []
          scenario.conditions.forEach((condition) => {
            if(condition.condition === 'BT') bigger = condition.scores
            if(condition.condition === 'LT') less = condition.scores
          })
          if(bigger !== null && less !== null && less < bigger) {
            rangeList.push([0, less-1], [bigger+1, 100000])
          }
          else if(bigger !== null && less !== null && less >= bigger) {
            rangeList.push([bigger+1, less-1])
          }
          else if(bigger !== null && less === null) {
            rangeList.push([bigger+1, 100000])
          }
          else if(bigger === null && less !== null) {
            rangeList.push([0, less-1])
          }
          console.log(rangeList)
          rangeList.forEach((range) => {
            if(this.totalScores >= range[0] && this.totalScores <= range[1]) {
              this.scenario.name = scenario.name
              this.scenario.header = scenario.header
              this.scenario.description = scenario.description
              this.scenario.image = scenario.imageLink
            }
          })
        })
      })
    },
    selectScenario() {

    }
  },
  mounted() {
    this.getScenario()
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/scenario.scss";
</style>
