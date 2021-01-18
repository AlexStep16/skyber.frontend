<template>
  <div style="width:100%">
    <div class="test__question mt5" v-for="(variant, index) in postQuestion.radioVariants" :key="`${variant.id}${index}`">
      <input
        type="text"
        class="input input_type-test-small"
        placeholder="Напишите здесь вариант ответа"
        v-model="variant.name"
        @focusout="checkIsEmpty(variant, index)"
      />
      <button class="button button_type-index" @click="deleteVariant(index)">Удалить</button>
    </div>
    <input
        type="text"
        class="input input_type-test-small"
        placeholder="Добавить вариант"
        @click="addVariant(postQuestion)"
        readonly
      />
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: "VariantOne",
  props: ['postQuestion'],
  data() {
    return {

    };
  },
  methods: {
    addVariant(question) {
      let variants = question.radioVariants;
      let length = variants.length;
      let lastIndex = length - 1;
      if (lastIndex < 0) {
        variants.push({
          id: 0,
          name: "Вариант 1",
        });
        return
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
      this.postQuestion.radioVariants.splice(index, 1)
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/common.blocks/maketest.scss";
</style>
