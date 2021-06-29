<template>
  <div class="form_type-radio mt7">
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
    showRightVariant(variantTrue) {
      if (this.settings.is_list && !this.postQuestion.showAllRightVariants) {
        return false;
      }
      if (this.settings.is_right_questions) {
        let right_variants = Array.isArray(this.postQuestion.right_variants) ? this.postQuestion.right_variants : []
        this.postQuestion.variants.forEach(variant => {
          if(variantTrue.id === variant.id) variant.color = 'wrong'
          else variant.color = 'neitral'
        })
        right_variants.forEach((rightVar) => {
          this.postQuestion.variants.forEach(variant => {
            if (typeof rightVar === 'string' && JSON.stringify(variant.name) === rightVar) {
              variant.color = 'right'
            }
          })
        })
        this.showRights = true
      }
      if (!this.settings.is_reanswer) {
        this.postQuestion.variants.forEach((variant) => {
          if(this.postQuestion.checked !== JSON.stringify(variant.name)) variant.disabled = true
        })
      }
    },
    variantChecked(variant) {
      if(variant.name === JSON.parse(this.postQuestion.checked)) return true
      return false
    }
  },
  watch: {
    "postQuestion.showAllRightVariants": {
      handler() {
        this.showRightVariant()
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/maketest.scss";


.form_radio-right{
  background-color: #caffbdb3!important;
  padding: 10px;

  .description {
    color: #696969;
    font-weight: 500;
  }
}

.form_radio-neitral {
  padding: 10px;
}

.form_radio-wrong{
  background-color: #ffb4b894!important;
  padding: 10px;

  .description {
    color: #696969;
    font-weight: 500;
  }
}

.form_radio {
  border-radius: 3px;
}

.description {
  font-family: 'Roboto', sans-serif;
  font-size: 0.9em;
  padding-left: 30px;
  margin-top: 4px;
}
</style>
