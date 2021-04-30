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
      <span class="pointer" @click="deleteVariant(index)">
        <img src="/pictures/trash.svg" width="19px" />
      </span>
    </div><hr />
    <div class="flex flex-justify-between mt5">
      <div class="test__add-variant pointer" @click="addVariant(postQuestion)">
        Добавить вариант
      </div>
      <div class="test-require flex flex-align-center">
        <label class="slider ml8">
          <input type="checkbox" v-model="postQuestion.isRequire">
          <span class="slider__circle slider__round"></span>
        </label>
        <span class="test-require__text ml5">Обязательный вопрос</span>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: "VariantStandart",
  props: ["postQuestion"],
  components: {
  },
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
@import "@/common.blocks/form-slider_type-main.scss";
</style>
