<template>
  <div>
    <div class="list-item" v-for="(poll, key) in postPolls" :key="poll.id">
      <span>Опрос</span>
      <h2 @click="goCreatePoll(poll)">{{ poll.pollName }}</h2>
      <p>{{ poll.pollDescription }}</p>
      <span>Количество отправлений: {{ poll.countSub }}</span
      >
      <div class="list-item__panel mt8">
        <div>
          <router-link
            :to="`/polls/${poll.hash}`"
            class="button button_type-list button_theme-purple"
          >
            Перейти к опросу
          </router-link>
        </div>
        <div>
          <router-link
            :to="`/stats/${poll.hash}`"
            class="button"
          >
            <img src="/pictures/circle.svg" width="32px">
          </router-link>
          <span
            @click="pollDelete(poll.id, key)"
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
