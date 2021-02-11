<template>
  <div>
    <multiselect v-model="checked" :options="getUnfoldOptions(postQuestion.standartVariants)"></multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "VariantUnfoldOutput",
  props: ["postQuestion"],
  components: {
    Multiselect
  },
  data() {
    return {
      checked: this.postQuestion.standartVariants[0].name,
    };
  },
  methods: {
    getUnfoldOptions(standartVariants) {
      let arr = [];

      standartVariants.forEach(variant => {
        arr.push(variant.name)
      });
      return arr;
    }
  },
};
</script>
