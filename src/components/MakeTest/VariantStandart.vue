<template>
  <div style="width: 100%">
    <div
      class="test__question mt5"
      v-for="(variant, index) in postQuestion.standartVariants"
      :key="`${variant.id}${index}`"
    >
      <div class="flex flex-center" v-if="postQuestion.typeAnswer == 'Несколько из списка'">
        <input
          class="custom-checkbox"
          type="checkbox"
          :id="`variantSt${postQuestion.id + index}`"
          :value="`${JSON.stringify(variant.name)}`"
          v-model="postQuestion.right_variants"
        />
        <label class="test__question-answer mr5 right-question-checkbox" :for="`variantSt${postQuestion.id + index}`"></label>
      </div>
      <div class="form_radio form_radio-right flex flex-center mr4" v-if="postQuestion.typeAnswer == 'Один из списка'">
        <input
          :id="`radio${postQuestion.id}${variant.id}`"
          type="radio"
          :name="`radio${postQuestion.id}`"
          :value="`${JSON.stringify(variant.name)}`"
          v-model="postQuestion.right_variants"
        />
        <label 
          class="test__question-answer"
          :for="`radio${postQuestion.id}${variant.id}`">
        </label>
      </div>
      <input
        type="text"
        class="input input_type-test-small"
        placeholder="Напишите здесь вариант ответа"
        v-model="variant.name"
        @focusout="checkIsEmpty(variant, index)"
      />
      <input
        type="text"
        class="input input_type-test-small"
        style="width: 80px;flex-grow:0"
        placeholder="баллы"
        v-model="variant.scores"
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
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/form-radio_type-main.scss";

</style>
