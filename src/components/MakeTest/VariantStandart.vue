<template>
  <div style="width: 100%">
    <div
      class="test-question flex-vertical mt5"
      v-for="(variant, index) in postQuestion.standartVariants"
      :key="`${variant.id}${index}`"
    >
      <div class="flex flex-align-center">
        <div class="flex flex-center" v-if="postQuestion.typeAnswer !== 'Выпадающий список'">
          <input
            class="custom-checkbox"
            type="checkbox"
            :id="`variantSt${postQuestion.id + index}`"
            :value="`${JSON.stringify(variant.name)}`"
            v-model="postQuestion.right_variants"
          />
          <label class="test-question-answer mr5 right-question-checkbox" :for="`variantSt${postQuestion.id + index}`"></label>
        </div>
        
        <input
          type="text"
          class="input input_type-test-small"
          placeholder="Напишите здесь вариант ответа"
          v-model="variant.name"
          @focusout="checkIsEmpty(variant, index)"
        />
        <input
          type="number"
          class="input input_type-test-small mr6"
          style="width: 85px;flex-grow:0"
          placeholder="баллы"
          v-model.number="variant.scores"
        />
        <span class="flex pointer" @click="deleteVariant(index)">
          <img src="/pictures/trash.svg" width="19px" />
        </span>
      </div>
      <div class="test-question-description flex flex-vertical" :class="postQuestion.typeAnswer === 'Выпадающий список' ? 'pl0' : ''">
        <span class="pointer" @click="addDescription(variant)" v-if="!variant.hasDescription">+ Добавить описание</span>
        <span class="pointer" @click="deleteDescription(variant)" v-if="variant.hasDescription">- Удалить описание</span>
        <textarea class="test-question-description__textarea mt5" v-if="variant.hasDescription" placeholder="Введите здесь описание к варианту" v-model="variant.description"></textarea>
      </div>
    </div>
    <hr />
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
          hasDescription: false,
        });
        return;
      }
      if (variants[lastIndex].name != null) {
        variants.push({
          id: length,
          name: "Вариант " + ++length,
          hasDescription: false,
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

    addDescription(variant) {
      variant.hasDescription = true
    },
    deleteDescription(variant) {
      variant.hasDescription = false
      variant.description = ''
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-slider_type-main.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/form-radio_type-main.scss";

</style>
