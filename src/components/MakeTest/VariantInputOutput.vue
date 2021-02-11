<template>
  <input
    type="text"
    class="input input_type-test-small"
    placeholder="Введите свой ответ здесь"
    style="cursor: default"
  />
</template>

<script>
//import axios from 'axios'

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
@import "@/common.blocks/maketest.scss";
</style>
