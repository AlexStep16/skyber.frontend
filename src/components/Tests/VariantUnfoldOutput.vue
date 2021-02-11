<template>
  <div>
    <multiselect v-model="postQuestion.checked" :options="getUnfoldOptions(postQuestion.variants)"></multiselect>
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
      //
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
