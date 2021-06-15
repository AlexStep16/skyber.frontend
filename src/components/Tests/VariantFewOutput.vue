<template>
  <div class="form_type-checkbox mt6">
    <div
      :class="'checkbox checkbox-' + variant.color"
      v-for="(variant, key) in getRadioArray(postQuestion.variants)"
      :key="variant.id"
    >
      <div>
        <input
          class="custom-checkbox"
          type="checkbox"
          :id="`variant${key}`"
          :name="`variant${key}`"
          :value="`${JSON.stringify(variant.name)}`"
          v-model="newSelected"
          @change="ready()"
          :disabled="variant.disabled"
        />
        <label :class="showRights ? `test-question-answer ${variant.color}-question-checkbox` : 'test-question-answer'" :for="`variant${key}`">{{ variant.name }}</label>
      </div>
      <div class="description" v-if="variant.hasDescription && showRights && isThatDescription(variant)">
        {{variant.description}}
      </div>
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
      showRights: false,
    };
  },
  methods: {
    getRadioArray(variants) {
      return variants.filter((elem) => {
        return elem.name != null;
      });
    },

    ready() {
      if(!this.settings.is_reanswer && this.showRights) return false
      this.$emit('ready', this.newSelected)
    },

    showRightVariant() {
      if(this.settings.is_right_questions && this.postQuestion.showAllRightVariants) {
        let right_variants = Array.isArray(this.postQuestion.right_variants) ? this.postQuestion.right_variants : []
        this.postQuestion.variants.forEach(variant => {
          variant.color = 'wrong'
        })
        right_variants.forEach((rightVar) => {
          this.postQuestion.variants.forEach(variant => {
            if (typeof rightVar === 'string' && JSON.stringify(variant.name) === rightVar) {
              variant.color = 'right'
            }
          })
        })
        this.showRights = true
        this.postQuestion.wasSelected = true
      }
      if (!this.settings.is_reanswer && this.postQuestion.showAllRightVariants) {
        this.postQuestion.variants.forEach(variant => {
          variant.disabled = true
        })
      } 
    },

    isThatDescription(variant) {
      return this.newSelected.includes(JSON.stringify(variant.name))
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
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";

.right-question-checkbox{
  background-color: #caffbd!important;
}

.wrong-question-checkbox{
  background-color: rgb(255, 180, 184)!important;
}

.checkbox {
  padding: 10px;
  border-radius: 2px;
}

.checkbox-wrong {
  background-color: rgb(255, 180, 184)!important;

  .description {
    color: #c70000;
  }
}

.checkbox-right {
  background-color: #caffbd!important;

  .description {
    color: #006e12;
  }
}

.description {
  font-family: 'Roboto', sans-serif;
  font-size: 0.9em;
  padding-left: 26px;
  margin-top: 4px;
}
</style>
