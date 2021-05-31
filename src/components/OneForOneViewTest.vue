<template>
  <div>
    <div
      class="test__block test__block_wraper bg-white-shadow test__item mt6"
    >
      <div style="display: flex; flex-direction: column; width: 100%">
        <div class="test__question-name mb6">
          {{ questions[questionCounter].name }}
        </div>
        <div class="test__image mt5" v-if="questions[questionCounter].image.link != null">
          <img :src="questions[questionCounter].image.link" />
        </div>
        <VariantOneOutput
          v-if="questions[questionCounter].typeAnswer == 'Один из списка'"
          :postQuestion="questions[questionCounter]"
        />
        <VariantInputOutput
          v-if="questions[questionCounter].typeAnswer == 'Ввод текста'"
          :postQuestion="questions[questionCounter]"
        />
        <VariantFewOutput
          v-if="questions[questionCounter].typeAnswer == 'Несколько из списка'"
          :postQuestion="questions[questionCounter]"
          @ready="readyCheck($event)"
        />
        <VariantUnfoldOutput
          v-if="questions[questionCounter].typeAnswer == 'Выпадающий список'"
          :postQuestion="questions[questionCounter]"
          @ready="readyCheck($event)"
        />
        <VariantDateOutput
          v-if="questions[questionCounter].typeAnswer == 'Дата'"
          :postQuestion="questions[questionCounter]"
          @ready="readyCheck($event)"
        />
        <VariantTimeOutput
          v-if="questions[questionCounter].typeAnswer == 'Время'"
          :postQuestion="questions[questionCounter]"
          @ready="readyCheck($event)"
        />
      </div>
    </div>
    <button class="button button_type-index button_theme-purple mt7" @click="nextQuestion">Дальше</button>
    <button class="button button_type-index button_theme-purple mt7" @click="backQuestion">Назад</button>
  </div>
</template>

<script>
import axios from "axios";

import VariantOneOutput from "@/components/Tests/VariantOneOutput.vue";
import VariantInputOutput from "@/components/Tests/VariantInputOutput.vue";
import VariantFewOutput from "@/components/Tests/VariantFewOutput.vue";
import VariantUnfoldOutput from "@/components/Tests/VariantUnfoldOutput.vue";
import VariantDateOutput from "@/components/Tests/VariantDateOutput.vue";
import VariantTimeOutput from "@/components/Tests/VariantTimeOutput.vue";

export default {
  name: 'OneForOneViewTest',
  props: ['hash'],
  data() {
    return {
      questionCounter: 0,
      questions: [{}],
    }
  },
  components: {
    VariantOneOutput,
    VariantInputOutput,
    VariantFewOutput,
    VariantUnfoldOutput,
    VariantDateOutput, VariantTimeOutput,
  },
  methods: {
    nextQuestion() {
      if (this.questions.length - 1 > this.questionCounter) this.questionCounter++
    },
    backQuestion() {
      if (this.questionCounter > 0) this.questionCounter--
    },
    readyCheck(event) {
      console.log(event)
      this.$set(this.questions[this.questionCounter], 'checked', event)
    }
  },
  beforeMount() {
    axios
      .get("test/questions/getByHash/" + this.hash)
      .then((res) => {
        this.questions = []
        res.data.data.forEach((element) => {
          let variants = JSON.parse(element.variants);
          
          this.questions.push({
            id: element.id,
            name: element.question,
            focused: false,
            variants: variants,
            typeAnswer: element.typeAnswer,
            isRequire: element.isRequire,
            image: {
              data: null,
              link: element.imageLink,
            },
          });
        });
      })
      .catch((e) => {
        console.log(e)
      }).finally(() => {
        this.$store.commit('HIDE_LOADER')
      });
  }
}

</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-radio_type-main.scss";
</style>
