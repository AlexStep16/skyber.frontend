<template>
  <div>
    <multiselect 
      v-model="checked" 
      :options="getUnfoldOptions(postQuestion.standartVariants)"
      :allow-empty="false"
      :multiple="false"
      selectLabel=""
      selectedLabel=""
      deselectLabel=""
      :placeholder="'Выберите ответ из списка'"
      class="test__multiselect-output"
    ></multiselect>
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

<style scoped>
  .test__multiselect-output {
    min-width: 300px;
  }

  @media (max-width: 540px) {
    .test__multiselect-output {
      min-width: 100%;
    }
  }
</style>
