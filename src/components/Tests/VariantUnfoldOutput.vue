<template>
  <div>
    <multiselect 
      v-model="postQuestion.checked" 
      :options="getUnfoldOptions(postQuestion.variants)"
      :allow-empty="false"
      :multiple="false"
      selectLabel=""
      selectedLabel=""
      deselectLabel=""
      :placeholder="'Выберите ответ из списка'"
      class="mt6"
    >
    </multiselect>
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
        arr.push(JSON.stringify(variant.name))
      });
      return arr;
    }
  },
};
</script>
