<template>
  <div class="scenario scenario_effect test__block bg-white-shadow mb7" :class="showEffect ? 'scenario_show-effect' : ''">
    <Loader v-if="showLoader" />
    <template v-if="scenario.header && !showLoader">
      <h2 class="scenario__header-preview mt0 mb0">{{ scenario.header }}</h2>
      <div class="scenario__description mt6" v-if="scenario.description" v-html="scenario.description"></div>
      <div class="scenario-image mt6" v-if="scenario.image">
        <div class="scenario-image__wraper">
          <img :src="scenario.image" />
        </div>
        <div class="modal modal_white absolute" v-if="imageLoading">
          <Loader />
        </div>
      </div>
    </template>
    <template v-else-if="!showLoader">
      <div class="scenario-success">
        <h2
          class="scenario-success__message flex flex-align-center"
        >
          <SuccessSVG />Успешно отправлено
        </h2>
      </div>
    </template>
  </div>
</template>

<script>
import SuccessSVG from "/public/pictures/success.svg";
import axios from "axios";
import Loader from "@/components/Loader.vue";

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
        imageLoading: false,
      },
      scenarios: [],
      showLoader: false,
      showEffect: true,
    }
  },
  components: {
    Loader, SuccessSVG
  },
  methods: {
    getScenario() {
      this.showLoader = true
      axios.get('scenarios/' + this.hash).then(res => {
        this.scenarios = res.data.data
        this.scenarios.forEach((scenario) => {
          let bigger = null;
          let less = null;
          let equal = null;
          let rangeList = []
          scenario.conditions.forEach((condition) => {
            if(condition.condition === 'BT') bigger = condition.scores
            if(condition.condition === 'LT') less = condition.scores
            if(condition.condition === 'EQ') equal = condition.scores
          })
          if(equal !== null) {
            rangeList.push([equal, equal])
          }
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
          rangeList.forEach((range) => {
            if(this.totalScores >= range[0] && this.totalScores <= range[1]) {
              this.imageLoading = true
              this.scenario.name = scenario.name
              this.scenario.header = scenario.header
              this.scenario.description = scenario.description
              this.scenario.image = scenario.imageLink
              this.imageLoading = false
            }
          })
        })

        let th = this
        setTimeout(() => {
          th.showEffect = false
        }, 2000);
      }).finally(() => {
        this.showLoader = false
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
