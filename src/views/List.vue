<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="list">
        <div class="list-item" v-for="(test, key) in tests" :key="test.id">
          <span>Тест</span>
          <h2 @click="goCreateTest(test)">{{ test.testName }}</h2>
          <p>{{ test.description }}</p>
          <span>Количество отправлений: {{ test.countSub }}</span>
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

        <div class="list-item" v-for="(poll, key) in polls" :key="poll.id">
          <span>Опрос</span>
          <h2 @click="goCreatePoll(poll)">{{ poll.pollName }}</h2>
          <p>{{ poll.pollDescription }}</p>
          <span>Количество отправлений: {{ poll.countSub }}</span>
          <button
            @click="pollDelete(poll.id, key)"
            class="button button_type-index button_theme-red"
          >
            Удалить опрос
          </button>
          <router-link
            :to="`/polls/${poll.hash}`"
            class="button button_type-index button_theme-blue"
          >
            Перейти к опросу
          </router-link>
          <router-link
            :to="`/stats/${poll.hash}`"
            class="button button_type-index button_theme-red"
          >
            Статистика
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue"

export default {
  name: "List",
  data() {
    return {
      tests: [],
      polls: [],
    };
  },
  components: {
    Header
  },
  methods: {
    goCreateTest(test) {
      this.$store.state.testStore.id = test.id;
      this.$router.push({ name: "MakeTest" });
    },
    goCreatePoll(poll) {
      this.$store.state.pollStore.id = poll.id;
      this.$router.push({ name: "MakePoll" });
    },

    testDelete($id, key) {
      axios.get("test/delete/" + $id).then(() => {
        this.tests.splice(key, 1);
      });
    },
    pollDelete($id, key) {
      axios.get("poll/delete/" + $id).then(() => {
        this.polls.splice(key, 1);
      });
    },
  },
  mounted() {
    axios.get("test/get/all").then((res) => {
      this.tests = res.data;
      axios.get("polls/get/all").then((res) => {
        this.polls = res.data;
        if(this.polls.length == 0 && this.tests.length == 0) {
          this.$router.push({name: 'Options'})
        }
      });

    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/list.scss";
</style>

