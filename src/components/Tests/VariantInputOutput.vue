<template>
  <input
    type="text"
    class="input input_type-test-small mt6"
    v-model="postQuestion.checked"
    placeholder="Введите свой ответ здесь"
    maxlength="250"
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
