<template>
  <div class="mt7">
    <div
      class="checkbox mt5"
      v-for="(variant, key) in variants"
      :key="variant.id"
    >
      <input
        class="custom-checkbox"
        type="checkbox"
        :id="`variant${key}`"
        :name="`variant${key}`"
        :value="variant.name"
      />
      <label class="poll__question-answer" :for="`variant${key}`">{{ variant.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "VariantFewOutput",
  props: ['variants'],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/main.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";
</style>
