<template>
  <div class="form_type-checkbox mt5">
    <div
      class="checkbox mt5"
      v-for="(variant, key) in getRadioArray(postQuestion.radioVariants)"
      :key="variant.id"
    >
      <input
        class="custom-checkbox"
        type="checkbox"
        :id="`variant${key}`"
        :name="`variant${key}`"
        :value="variant.name"
      />
      <label :for="`variant${key}`">{{ variant.name }}</label>
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
</style>
