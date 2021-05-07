<template>
  <div>
    <div class="list-item" v-for="(poll, key) in postPolls" :key="poll.id">
      <span>Опрос</span>
      <h2 @click="goCreatePoll(poll)" class="mt6 mb6 pointer">{{ poll.pollName }}</h2>
      <p class="list-item__description mb7">{{ poll.pollDescription }}</p>
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
            @click="showModal(poll.id, key)"
            class="ml5"
          >
            <img src="/pictures/trash.svg" class="pointer" width="22px">
          </span>
        </div>
      </div>
    </div>

    <DeleteModal
      v-if="!isModalHide"
      message="Вы действительно хотите удалить опрос?" 
      redMessage="Удалить" 
      blueMessage="Отмена"
      @action="deleteMessage($event)"
    />
  </div>
</template>

<script>
import axios from "axios";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  name: "PollsList",
  props: ["postPolls"],
  data() {
    return {
      tempDelete: {
        id: null,
        key: null
      },
      isModalHide: true,
    }
  },
  components: {
    DeleteModal
  },
  methods: {
    goCreatePoll(poll) {
      this.$router.push({ name: "MakePoll", params: {hash: poll.hash} });
    },

    pollDelete(id, key) {
      axios.post("poll/delete/", {id: id, fingerprint: window.VISITOR_ID}).then(() => {
        this.postPolls.splice(key, 1);
        this.$store.commit('CLEAR_POLL_DRAFT')
      });
    },

    deleteMessage(value) {
      if(value === 1) {
        this.pollDelete(this.tempDelete.id, this.tempDelete.key)
      }
      this.isModalHide = true
    },

    showModal(id, key) {
      this.tempDelete.id = id
      this.tempDelete.key = key
      this.isModalHide = false
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/list.scss";
</style>
