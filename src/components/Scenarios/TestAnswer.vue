<template>
  <div class="scenario test__block bg-white-shadow mb7" :style="(showLoader || fakeLoader) ? 'min-height: 250px' : ''">
    <div class="modal modal_white absolute" v-if="showLoader || fakeLoader" style="z-index: 10">
      <Loader />
    </div>
    <div v-if="!showLoader && !fakeLoader">
      <template v-if="hasScenario">
        <div class="scenario__result mb6">Результат теста</div>
        <h2 class="scenario__header-preview mt0 mb0">{{ scenario.header }}</h2>
        <div class="scenario__description dashed-list" :class="scenario.header ? 'mt6' : ''" v-if="scenario.description" v-html="scenario.description"></div>
        <div class="scenario-image mt6" :style="{textAlign: img.align}" v-for="(img, key) in scenario.images" :key="key">
          <div class="scenario-image__wraper">
            <img :src="img.original_url" :width="img.width" />
          </div>
          <div class="modal modal_white absolute" v-if="imageLoading">
            <Loader />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="scenario-success">
          <h2
            class="scenario-success__message flex flex-align-center"
          >
            <SuccessSVG />Успешно отправлено
          </h2>
        </div>
      </template>
      <div class="scenario-share mt7">
        <div class="scenario-share__text">
          Поделиться в соцсетях:
        </div>
        <ShareNetwork
          network="vk"
          :url="url"
          :title="title"
          hashtags="skyber,tests,тесты"
        >
          <Vk />
        </ShareNetwork>
        <ShareNetwork
          network="twitter"
          :url="url"
          :title="title"
          hashtags="skyber,tests,тесты"
        >
          <Twitter />
        </ShareNetwork>
        <ShareNetwork
          network="facebook"
          :url="url"
          :title="title"
          hashtags="skyber,tests,тесты"
        >
          <Facebook />
        </ShareNetwork>
      </div>
    </div>
  </div>
</template>

<script>
import SuccessSVG from "/public/pictures/success.svg";
import axios from "axios";
import Loader from "@/components/Loaders/Loader.vue";
import Vk from "/public/pictures/vk36.svg";
import Twitter from "/public/pictures/twitter36.svg";
import Facebook from "/public/pictures/facebook36.svg";

export default {
  name: 'TestAnswer',
  props: ['totalScores', 'hash', 'fakeLoader', 'testName'],
  data() {
    return {
      scenario: {
        name: '',
        description: '',
        header: '',
        images: [],
        imageLoading: false,
      },
      scenarios: [],
      showLoader: true,
      hasScenario: false,
      url: '',
      title: '',
    }
  },
  components: {
    Loader, SuccessSVG,
    Vk, Facebook, Twitter
  },
  methods: {
    getScenario() {
      this.showLoader = true
      this.totalScores = parseInt(this.totalScores)
      axios.get('scenarios/' + this.hash).then(res => {
        this.scenarios = res.data.data
        this.scenarios.forEach((scenario) => {
          let bigger = null;
          let less = null;
          let equal = null;
          let rangeList = []
          scenario.conditions.forEach((condition) => {
            if(condition.condition === 'BT') bigger = parseInt(condition.scores)
            if(condition.condition === 'LT') less = parseInt(condition.scores)
            if(condition.condition === 'EQ') equal = parseInt(condition.scores)
          })
          if(equal !== null) {
            rangeList.push([equal, equal])
          }
          if(bigger !== null && less !== null && less < bigger) {
            rangeList.push([-100000, less-1], [bigger+1, 100000])
          }
          else if(bigger !== null && less !== null && less >= bigger) {
            rangeList.push([bigger+1, less-1])
          }
          else if(bigger !== null && less === null) {
            rangeList.push([bigger+1, 100000])
          }
          else if(bigger === null && less !== null) {
            rangeList.push([-100000, less-1])
          }
          rangeList.forEach((range) => {
            if(this.totalScores >= range[0] && this.totalScores <= range[1]) {
              this.hasScenario = true
              this.imageLoading = true
              this.scenario.name = scenario.name
              this.scenario.header = scenario.header
              this.scenario.description = scenario.description
              
              for(let key in scenario.imageLink) {
                this.$set(this.scenario.images, key, scenario.imageLink[key])
              }

              this.imageLoading = false
            }
          })
        })
      }).finally(() => {
        this.showLoader = false
      })
    },
    selectScenario() {

    }
  },
  beforeMount() {
    this.getScenario()

    this.url = "https://skyber.ru/tests/" + this.hash
    this.title = this.testName + ' | Skyber'
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/scenario.scss";
</style>
