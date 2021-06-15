<template>
  <div class="container flex flex-justify-center">
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
        <div class="create-test bg-white-shadow pointer" v-if="listSelected == 'tests'" @click="makeTest()">
          <img src="/pictures/plus.svg" width="22" class="mr5">
          <span>Создать новый тест</span>
        </div>
        <div class="create-test bg-white-shadow pointer" v-if="listSelected == 'polls'" @click="makePoll()">
          <img src="/pictures/plus.svg" width="22" class="mr5">
          <span>Создать новый опрос</span>
        </div>
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
      form: {
        name: "",
        email: "",
        status: "draft",
        variants: [],
      },
    };
  },
  components: {
    Header,
    TestsList,
    PollsList,
  },
  methods: {
    makeTest() {
      this.$router.push({ name: "TestCreator" });
    },

    makePoll() {
      this.$router.push({ name: "PollCreator" });
    },

    deleteMessage(value) {
      console.log(value)
    }
  },
  mounted() {
    this.$store.commit('SHOW_LOADER')
    axios.post("test/get/all", {fingerprint: window.VISITOR_ID}).then((res) => {
      this.tests = res.data.data;
      axios.get("polls/get/all").then((res) => {
        this.polls = res.data.data;
        if (this.polls.length == 0 && this.tests.length == 0) {
          this.$router.push('/test/create');
        }
      }).finally(() => {
        this.$store.commit('HIDE_LOADER')
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/list.scss";
</style>

<style lang="sass">
@import '@/common.blocks/body/_themes/body_themes-light.scss';
</style>
