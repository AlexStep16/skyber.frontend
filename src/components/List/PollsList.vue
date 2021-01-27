<template>
  <div>
    <div class="list-item" v-for="(poll, key) in postPolls" :key="poll.id">
      <span>Опрос</span>
      <h2 @click="goCreatePoll(poll)">{{ poll.pollName }}</h2>
      <p>{{ poll.pollDescription }}</p>
      <span>Количество отправлений: {{ poll.countSub }}</span
      ><br />
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
</template>

<script>
import axios from "axios";

export default {
  name: "PollsList",
  props: ["postPolls"],
  components: {},
  methods: {
    goCreatePoll(poll) {
      this.$store.state.pollStore.id = poll.id;
      this.$router.push({ name: "MakePoll" });
    },

    pollDelete($id, key) {
      axios.get("poll/delete/" + $id).then(() => {
        this.postPolls.splice(key, 1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/list.scss";
</style>
