<template>
  <div class="form_type-radio">
    <div
      class="form_radio"
      v-for="variant in getRadioArray(postQuestion.variants)"
      :key="variant.id"
    >
      <input
        :id="`radio${postQuestion.id}${variant.id}`"
        type="radio"
        :name="`radio${postQuestion.id}${variant.id}`"
        :value="variant.name + '_' + postQuestion.id + variant.id"
        v-model="postQuestion.checked"
      />
      <label 
        class="test__question-answer"
        :for="`radio${postQuestion.id}${variant.id}`">{{
        variant.name
      }}</label>
    </div>
  </div>
</template>

<script>

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
</style>
