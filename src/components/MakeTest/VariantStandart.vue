<template>
  <div style="width: 100%">
    <div
      class="test__question mt5"
      v-for="(variant, index) in postQuestion.standartVariants"
      :key="`${variant.id}${index}`"
    >
      <input
        type="text"
        class="input input_type-test-small"
        placeholder="Напишите здесь вариант ответа"
        v-model="variant.name"
        @focusout="checkIsEmpty(variant, index)"
      />
      <span
        @click="deleteVariant(index)"
      >
        <img src="/pictures/trash.svg" width="32px" />
      </span>
    </div>
    <div class="test__add-variant mt5" @click="addVariant(postQuestion)">
      Добавить вариант
    </div>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: "VariantStandart",
  props: ["postQuestion"],
  data() {
    return {};
  },
  methods: {
    addVariant(question) {
      let variants = question.standartVariants;
      let length = variants.length;
      let lastIndex = length - 1;
      if (lastIndex < 0) {
        variants.push({
          id: 0,
          name: "Вариант 1",
        });
        return;
      }
      if (variants[lastIndex].name != null) {
        variants.push({
          id: length,
          name: "Вариант " + ++length,
        });
      }
    },

    checkIsEmpty(variant, index) {
      if (variant.name == "") {
        variant.name = "Вариант " + ++index;
      }
    },

    deleteVariant(index) {
      this.postQuestion.standartVariants.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/common.blocks/maketest.scss";
</style>
