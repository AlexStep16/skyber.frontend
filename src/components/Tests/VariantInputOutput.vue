<template>
  <input
    type="text"
    class="input input_type-test-small mt5"
    v-model="postQuestion.checked"
    placeholder="Введите свой ответ здесь"
  />
</template>

<script>

export default {
  name: "VariantInputOutput",
  props: ["postQuestion"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-radio_type-main.scss";
</style>
