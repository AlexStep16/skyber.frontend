<template>
  <div class="form_type-radio mt6">
    <div
      :class="showRights ? 'form_radio form_radio-' + variant.color : 'form_radio'"
      v-for="variant in getRadioArray(postQuestion.variants)"
      :key="variant.id"
    >
      <input
        :id="`radio${postQuestion.id}${variant.id}`"
        type="radio"
        :name="`radio${postQuestion.id}${variant.id}`"
        :value="`${JSON.stringify(variant.name)}`"
        v-model="postQuestion.checked"
        @change="showRightVariant(variant)"
      />
      <label 
        class="test__question-answer"
        :for="`radio${postQuestion.id}${variant.id}`">{{
        variant.name
      }}</label>
    </div>
  </div>
</template>

<script>

export default {
  name: "VariantOneOutput",
  props: ["postQuestion", "settings"],
  data() {
    return {
      showRights: false,
    };
  },
  methods: {
    getRadioArray(variants) {
      return variants.filter((elem) => {
        return elem.name != null;
      });
    },
    showRightVariant(variant) {
      if(this.settings.is_right_questions) {
        let right_variants = JSON.parse(this.postQuestion.right_variants)
        if(typeof right_variants === 'string') {
          if (variant.name == right_variants) {
            variant.color = 'right'
          } else {
            variant.color = 'wrong'
          }
          this.showRights = true
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/maketest.scss";
</style>
