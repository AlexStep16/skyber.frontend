<template>
  <div class="form_type-radio mt5">
    <div
      :class="showRights ? 'form_radio form_radio-' + variant.color : 'form_radio'"
      v-for="variant in getRadioArray(postQuestion.variants)"
      :key="variant.id"
    >
      <div>
        <input
          :id="`radio${postQuestion.id}${variant.id}`"
          type="radio"
          :name="`radio${postQuestion.id}${variant.id}`"
          :value="`${JSON.stringify(variant.name)}`"
          v-model="postQuestion.checked"
          @change="showRightVariant(variant)"
          v-if="!variant.disabled"
        />
        <label 
          class="test-question-answer"
          :for="`radio${postQuestion.id}${variant.id}`">{{
          variant.name
        }}
        </label>
      </div>
      <div class="description" v-if="variant.hasDescription && showRights && variantChecked(variant)">
        {{variant.description}}
      </div>
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
      if(this.settings.is_right_questions && !this.postQuestion.alreadySelect) {
        let right_variants = JSON.parse(this.postQuestion.right_variants)

        this.postQuestion.variants.forEach(variant => {
          if (variant.name == right_variants) {
            variant.color = 'right'
          } else {
            variant.color = 'wrong'
          }
          this.showRights = true
        })
      }
      if(!this.settings.is_reanswer) {
        this.postQuestion.variants.forEach((variantInside) => {
          if(variant.id !== variantInside.id) variantInside.disabled = true
        })
      }
    },
    variantChecked(variant) {
      if(variant.name === JSON.parse(this.postQuestion.checked)) return true
      return false
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/maketest.scss";


.form_radio-right{
  background-color: #caffbd!important;

  .description {
    color: #006e12;
  }
}

.form_radio-wrong{
  background-color: rgb(255, 180, 184)!important;

  .description {
    color: #c70000;
  }
}

.form_radio {
  padding: 10px;
  border-radius: 2px;
}

.description {
  font-family: 'Roboto', sans-serif;
  font-size: 0.9em;
  padding-left: 30px;
  margin-top: 4px;
}
</style>
