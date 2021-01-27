<template>
  <div class="form_type-checkbox mt5">
    <div
      class="checkbox mt5"
      v-for="(variant, key) in getRadioArray(postQuestion.variants)"
      :key="variant.id"
    >
      <input
        class="custom-checkbox"
        type="checkbox"
        :id="`variant${key}`"
        :name="`variant${key}`"
        :value="variant.name"
        v-model="newSelected"
        @change="ready"
      />
      <label :for="`variant${key}`">{{ variant.name }}</label>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: "VariantFewOutput",
  props: ["postQuestion"],
  data() {
    return {
      newSelected: []
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
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-checkbox_type-main.scss";
</style>
