<template>
  <div class="form_type-radio mt5">
    <div
      class="form_radio"
      v-for="variant in getRadioArray(variants)"
      :key="variant.id"
    >
      <input
        :id="`radio${variant.id}`"
        type="radio"
        :name="`poll`"
        :value="variant.name"
        v-model="newSelected"
        @change="ready"
      />
      <label :for="`radio${variant.id}`">
        {{ variant.name }}
      </label>
    </div>
  </div>
</template>

<script>


export default {
  name: "VariantOneOutput",
  props: ["variants", "selected"],
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
@import "@/common.blocks/main.scss";
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";
</style>
