<template>
  <div class="form_type-radio">
    <div
      class="form_radio"
      v-for="variant in getRadioArray(postQuestion.standartVariants)"
      :key="variant.id"
    >
      <input
        :id="`radio${postQuestion.id}${variant.id}`"
        type="radio"
        :name="`radio${postQuestion.id}${variant.id}`"
        :value="variant.name"
      />
      <label 
        class="test-question-answer"
        :for="`radio${postQuestion.id}${variant.id}`">
        {{ variant.name }}
      </label>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: "VariantOneOutput",
  props: ["postQuestion"],
  data() {
    return {};
  },
  methods: {
    getRadioArray(variants) {
      return variants.filter((elem) => {
        return elem.name != null;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/maketest.scss";

.form_radio {
  padding: 10px;
  border-radius: 2px;
}
</style>
