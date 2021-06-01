<template>
  <div class="form_type-radio">
    <div
      :class="showRights ? 'form_radio form_radio-' + variant.color : 'form_radio'"
      v-for="variant in getRadioArray(postQuestion.variants)"
      :key="variant.id"
    >
      <input
        :id="`radio${postQuestion.id}${variant.id}`"
        type="radio"
        :name="`radio${postQuestion.id}${variant.id}`"
        :value="`${variant.name}`"
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
        if(Array.isArray(this.postQuestion.right_variants)) {
          this.postQuestion.right_variants.forEach((rightVar) => {
            if (variant.name == rightVar.split('_')[0]) {
              variant.color = 'right'
            } else {
              variant.color = 'wrong'
            }
          })
        }
        else {
          if (variant.name == this.postQuestion.right_variants.split('_')[0]) {
            variant.color = 'right'
          } else {
            variant.color = 'wrong'
          }
        }
        this.showRights = true
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/maketest.scss";
</style>
