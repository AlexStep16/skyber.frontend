<template>
  <div class="list-main-wraper">
    <div class="list-item" v-for="(test, key) in postTests" :key="test.id">
      <span class="list-item__tag">Тест</span>
      <h2 @click="goCreateTest(test)" class="mt6 mb6 pointer">{{ test.testName }}</h2>
      <p class="list-item__description mb7">{{ test.description }}</p>
      <span>Количество отправлений: {{ test.countSub }}</span>
      <div class="list-item__panel mt8">
        <div>
          <router-link
            :to="`/tests/${test.hash}`"
            class="button button_type-list button_theme-purple"
          >
            Перейти к тесту
          </router-link>
        </div>
        <div class="flex flex-center">
          <router-link
            :to="`/test/edit/${test.hash}`"
            title="Редактировать"
          >
            <img src="/Vectors/pen32.svg" width="30px">
          </router-link>
          <router-link
            :to="`/stats/${test.hash}`"
            title="Статистика"
          >
            <img src="/pictures/circle.svg" width="30px">
          </router-link>
          <span
            @click="showModal(test.id, key)"
            class="ml5"
            title="Удалить"
          >
            <img src="/pictures/trash.svg" class="pointer" width="22px">
          </span>
        </div>
      </div>
    </div>

    <DeleteModal 
      v-if="!isModalHide"
      message="Вы действительно хотите удалить тест?" 
      redMessage="Удалить" 
      blueMessage="Отмена"
      @action="deleteMessage($event)"
    />
  </div>
</template>

<script>
import axios from "axios";
import DeleteModal from "@/components/DeleteModal.vue";

/* import Circle32 from "../../public/pictures/circle.svg";
import Trash32 from "../../public/pictures/trash.svg"; */

export default {
  name: "TestList",
  props: ["postTests"],
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
    goCreateTest(test) {
      this.$router.push({ name: "MakeTest", params: {hash: test.hash} });
    },

    testDelete(id, key) {
      this.$store.commit('SHOW_LOADER')
      axios.post("test/delete/",{id: id, fingerprint: window.VISITOR_ID}).then(() => {
        this.postTests.splice(key, 1);
        this.$store.commit('CLEAR_TEST_DRAFT')
        this.$store.commit('HIDE_LOADER')
      });
    },

    deleteMessage(value) {
      if(value === 1) {
        this.testDelete(this.tempDelete.id, this.tempDelete.key)
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
