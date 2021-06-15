<template>
  <div class="form_type-radio mt7">
    <div
      class="form_radio mb6"
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
      <label 
        class="poll__question-answer"
        :for="`radio${variant.id}`">
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
@import "@/common.blocks/makepoll.scss";
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";

.form_radio {
  padding: 10px;
  border-radius: 2px;
}
</style>
