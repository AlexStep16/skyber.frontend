<template>
  <div class="test-unfolding-list">
    <multiselect 
      v-model="cloneQuestion.checked" 
      :options="postQuestion.variants"
      track-by="id"
      label="name"
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
      cloneQuestion: {
        checked: [],
        variants: [],
      }
    };
  },
  watch: {
    "cloneQuestion.checked": {
      deep: true,
      handler() {
        this.postQuestion.checked = [this.cloneQuestion.checked.id]
      }
    }
  },
  beforeMount() {
    this.cloneQuestion.variants = Object.assign({}, this.postQuestion).variants
  }
};
</script>
