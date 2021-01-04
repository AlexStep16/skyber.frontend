<template>
  <form class="form form_type-test">
    <div>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Название теста"
        class="input input_type-test"
        v-model="testForm.name"
      />
    </div>
    <div>
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Описание теста"
        class="input input_type-test"
        v-model="testForm.description"
      />
    </div>
    <!-- <input type="submit" class="input input_type-submit_full input_theme-blue mt7" value="Создать тест" @click.prevent="submit"> -->
  </form>
</template>

<script>
//import axios from "axios"

export default {
  name: "TestForm",
  data() {
    return {
      testForm: {
        name: this.$store.state.testStore.name,
        description: "",
      },
    };
  },
  methods: {
    submit() {},
  },
  mounted() {
    console.log(this.$store.state);
  },
};
</script>

<style scoped lang="scss">
</style>
