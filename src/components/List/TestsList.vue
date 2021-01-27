<template>
  <div>
    <div class="list-item" v-for="(test, key) in postTests" :key="test.id">
      <span>Тест</span>
      <h2 @click="goCreateTest(test)">{{ test.testName }}</h2>
      <p>{{ test.description }}</p>
      <span>Количество отправлений: {{ test.countSub }}</span
      ><br />
      <button
        @click="testDelete(test.id, key)"
        class="button button_type-index button_theme-red"
      >
        Удалить тест
      </button>
      <router-link
        :to="`/tests/${test.hash}`"
        class="button button_type-index button_theme-blue"
      >
        Перейти к тесту
      </router-link>
      <router-link
        :to="`/stats/${test.hash}`"
        class="button button_type-index button_theme-red"
      >
        Статистика
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TestList",
  props: ["postTests"],
  components: {},
  methods: {
    goCreateTest(test) {
      this.$store.state.testStore.id = test.id;
      this.$router.push({ name: "MakeTest" });
    },

    testDelete($id, key) {
      axios.get("test/delete/" + $id).then(() => {
        this.postTests.splice(key, 1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/list.scss";
</style>
