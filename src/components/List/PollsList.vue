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
        <div class="flex flex-center">
          <router-link
            :to="`/stats/${poll.hash}`"
            class=""
          >
            <img src="/pictures/circle.svg" width="30px">
          </router-link>
          <span
            @click="pollDelete(poll.id, key)"
            class="ml5"
          >
            <img src="/pictures/trash.svg" width="22px">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "PollsList",
  props: ["postPolls"],
  components: {},
  methods: {
    ...mapMutations(["SET_POLL"]),

    goCreatePoll(poll) {
      this.SET_POLL({id: poll.id, name: poll.name});
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
