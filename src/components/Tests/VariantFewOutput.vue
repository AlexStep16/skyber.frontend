<template>
  <div class="form_type-checkbox mt7">
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
          @change="selectId(variant, $event, key)"
          :disabled="variant.disabled"
        />
        <label class="pointer" :class="showRights ? `test-question-answer ${variant.color}-question-checkbox` : 'test-question-answer'" :for="`variant${key}`">{{ variant.name }}</label>
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
      selectedId: [],
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
      if(this.showRights) this.showRightVariant()
      this.newSelected = []
      this.selectedId.forEach(id => {
        this.newSelected.push(JSON.stringify(this.postQuestion.variants[id].name))
      })
      this.$emit('ready', this.newSelected)
    },

    showRightVariant() {
      if(this.postQuestion.showAllRightVariants) {
        let right_variants = Array.isArray(this.postQuestion.right_variants) ? this.postQuestion.right_variants : []

        this.postQuestion.variants.forEach(variant => {
          if(this.selectedId.includes(variant.id) && (this.settings.is_right_questions || this.settings.is_wrong_questions)) variant.color = 'wrong'
          else variant.color = 'neitral'
        })
        right_variants.forEach((rightVar) => {
          this.postQuestion.variants.forEach(variant => {
            if (
              typeof rightVar === 'string' 
              && JSON.stringify(variant.name) === rightVar
              && (this.settings.is_right_questions || this.selectedId.includes(variant.id))
            ) {
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
    },

    selectId(variant, event) {
      if(event.target.checked) {
        this.selectedId.push(variant.id)
      }
      else {
        this.selectedId.splice(this.selectedId.indexOf(variant.id), 1)
      }
      this.ready()
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
  padding: 10px;
  background-color: #caffbd!important;
}

.wrong-question-checkbox{
  padding: 10px;
  background-color: rgb(255, 180, 184)!important;
}

.neitral-question-checkbox{
  padding: 10px;
}

.checkbox {
  border-radius: 3px;
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
  padding-left: 37px;
  margin-top: 4px;
  padding-bottom: 10px;
}
</style>
