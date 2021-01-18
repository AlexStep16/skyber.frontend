<template>
  <div>
    <div
      class="checkbox mt5"
      v-for="(variant, key) in variants"
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
export default {
  name: "VariantFewOutput",
  props: ["variants", "selected"],
  data() {
    return {
      newSelected: []
    };
  },
  methods: {
    ready() {
      this.$emit('ready', this.newSelected)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/main.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";
</style>
