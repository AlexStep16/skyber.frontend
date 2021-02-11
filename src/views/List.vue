<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="pollOrTest">
        <div
          @click="listSelected = 'tests'"
          :class="
            listSelected == 'tests'
              ? 'pollOrTest__item pollOrTest__item_selected'
              : 'pollOrTest__item'
          "
        >
          Тесты
        </div>
        <div
          @click="listSelected = 'polls'"
          :class="
            listSelected == 'polls'
              ? 'pollOrTest__item pollOrTest__item_selected'
              : 'pollOrTest__item'
          "
        >
          Опросы
        </div>
      </div>
      <div class="list">
        <router-link to="/options" class="create-test">
          <img src="/pictures/plus.svg" width="22" class="mr5">
          <span v-if="listSelected == 'tests'">Создать новый тест</span>
          <span v-if="listSelected == 'polls'">Создать новый опрос</span>
        </router-link>
        <TestsList :postTests="tests" v-if="listSelected == 'tests'" />
        <PollsList :postPolls="polls" v-if="listSelected == 'polls'" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import TestsList from "@/components/List/TestsList.vue";
import PollsList from "@/components/List/PollsList.vue";

export default {
  name: "List",
  data() {
    return {
      tests: [],
      polls: [],
      listSelected: "tests",
    };
  },
  components: {
    Header,
    TestsList,
    PollsList,
  },
  methods: {},
  mounted() {
    axios.get("test/get/all").then((res) => {
      this.tests = res.data;
      axios.get("polls/get/all").then((res) => {
        this.polls = res.data;
        if (this.polls.length == 0 && this.tests.length == 0) {
          this.$router.push({ name: "Options" });
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

