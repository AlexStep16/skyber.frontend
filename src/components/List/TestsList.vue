<template>
  <div>
    <div class="list-item" v-for="(test, key) in postTests" :key="test.id">
      <span>Тест</span>
      <h2 @click="goCreateTest(test)">{{ test.testName }}</h2>
      <p>{{ test.description }}</p>
      <span>Количество отправлений: {{ test.countSub }}</span
      >
      <div class="list-item__panel mt8">
        <div>
          <router-link
            :to="`/tests/${test.hash}`"
            class="button button_type-list button_theme-purple"
          >
            Перейти к тесту
          </router-link>
        </div>
        <div>
          <router-link
            :to="`/stats/${test.hash}`"
            class="button"
          >
            <img src="/pictures/circle.svg" width="32px">
          </router-link>
          <span
            @click="testDelete(test.id, key)"
            class="button"
          >
            <img src="/pictures/trash.svg" width="32px">
          </span>
        </div>
      </div>
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
