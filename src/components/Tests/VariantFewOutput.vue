<template>
  <div class="form_type-checkbox mt6">
    <div
      class="checkbox"
      v-for="(variant, key) in getRadioArray(postQuestion.variants)"
      :key="variant.id"
    >
      <input
        class="custom-checkbox"
        type="checkbox"
        :id="`variant${key}`"
        :name="`variant${key}`"
        :value="`${JSON.stringify(variant.name)}`"
        v-model="newSelected"
        @change="ready();showRightVariant(variant)"
      />
      <label :class="showRights ? `test__question-answer ${variant.color}-question-checkbox` : 'test__question-answer'" :for="`variant${key}`">{{ variant.name }}</label>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: "VariantFewOutput",
  props: ["postQuestion", "settings"],
  data() {
    return {
      newSelected: [],
      showRights: false
    };
  },
  methods: {
    getRadioArray(variants) {
      return variants.filter((elem) => {
        return elem.name != null;
      });
    },

    ready() {
      this.$emit('ready', this.newSelected)
    },

    showRightVariant(variant) {
      if(this.settings.is_right_questions) {
        let right_variants = Array.isArray(this.postQuestion.right_variants) ? this.postQuestion.right_variants : []
        variant.color = 'wrong'
        right_variants.forEach((rightVar) => {
          if (typeof rightVar === 'string' && JSON.stringify(variant.name) === rightVar) {
            variant.color = 'right'
            return true;
          }
        })
        this.showRights = true
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";
</style>
