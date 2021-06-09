<template>
  <div class="form_type-checkbox">
    <div
      class="checkbox"
      v-for="(variant, key) in getRadioArray(postQuestion.standartVariants)"
      :key="variant.id"
    >
      <input
        class="custom-checkbox"
        type="checkbox"
        :id="`variant${key}`"
        :name="`variant${key}`"
        :value="variant.name"
      />
      <label class="test-question-answer" :for="`variant${key}`">{{ variant.name }}</label>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: "VariantFewOutput",
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
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/maketest.scss";

.checkbox {
  padding: 10px;
  border-radius: 2px;
}
</style>
