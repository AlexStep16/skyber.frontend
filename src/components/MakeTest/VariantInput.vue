<template>
  <div style="width: 100%">
    <div>
      <input
        type="text"
        class="input input_type-test-small"
        placeholder="Текстовое поле"
        disabled
      />
    </div>
    <div class="test-require mt7 flex flex-align-center">
      <label class="slider">
        <input type="checkbox">
        <span class="slider__circle slider__round"></span>
      </label>
      <span class="test-require__text ml5">Обязательный вопрос</span>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: "VariantInput",
  props: ["postQuestion"],
  data() {
    return {};
  },
  methods: {
    
  },
};
</script>

<style scoped lang="scss">
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-slider_type-main.scss";
</style>
