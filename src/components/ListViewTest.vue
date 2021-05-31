<template>
  <div>
    <div
      class="test__block test__block_wraper bg-white-shadow test__item mt6"
      v-for="question in questions"
      :key="question.id"
    >
      <div style="display: flex; flex-direction: column; width: 100%">
        <div class="test__question-name mb6">
          {{ question.name }}
        </div>
        <div class="test__image mt5" v-if="question.image.link != null">
          <img :src="question.image.link" />
        </div>
        <VariantOneOutput
          v-if="question.typeAnswer == 'Один из списка'"
          :postQuestion="question"
        />
        <VariantInputOutput
          v-if="question.typeAnswer == 'Ввод текста'"
          :postQuestion="question"
        />
        <VariantFewOutput
          v-if="question.typeAnswer == 'Несколько из списка'"
          :postQuestion="question"
          @ready="question.checked = $event"
        />
        <VariantUnfoldOutput
          v-if="question.typeAnswer == 'Выпадающий список'"
          :postQuestion="question"
          @ready="question.checked = $event"
        />
        <VariantDateOutput
          v-if="question.typeAnswer == 'Дата'"
          :postQuestion="question"
          @ready="question.checked = $event"
        />
        <VariantTimeOutput
          v-if="question.typeAnswer == 'Время'"
          :postQuestion="question"
          @ready="question.checked = $event"
        />
      </div>
    </div>
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
  name: 'ListViewTest',
  props: ['hash'],
  data() {
    return {
      questions: [],
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
    
  },
  mounted() {
    axios
      .get("test/questions/getByHash/" + this.hash)
      .then((res) => {
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
