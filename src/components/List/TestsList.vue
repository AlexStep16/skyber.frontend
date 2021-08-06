<template>
  <div class="list-main-wraper">
    <div class="list-item bg-white-shadow" v-for="(test, key) in postTests" :key="test.id">
      <!-- <span class="list-item__tag">Тест</span> -->
      <h2 @click="goCreateTest(test)" class="mt6 mb6 pointer">{{ test.testName || 'Без названия' }}</h2>
      <div class="list-item__description mb6" v-if="test.description" v-html="sliceDescription(test.description)"></div>
      <div class="list-item__link mb6">
        <span>Ссылка на тест:</span>
        <input type="text" 
              class="input input_type-link wd100 mt2" 
              :value="'https://skyber.ru/tests/' + test.hash"
              :ref="'linkInput' + test.id"
              @click="$refs['linkInput' + test.id][0].select()"
              readonly
        >
      </div>
      <span class="list-item__counter">Количество отправлений: {{ test.countSub }}</span>
      <div class="list-item__panel mt7">
        <div>
          <router-link
            :to="`/tests/${test.hash}`"
            class="button button_type-list button_theme-roboto button_theme-purple"
          >
            Перейти к тесту
          </router-link>
        </div>
        <div class="flex flex-center">
          <div class="list-item__icon flex flex-center">
            <router-link
              :to="`/test/edit/${test.hash}`"
              title="Редактировать"
              class="flex flex-center"
            >
              <PenSVG />
            </router-link>
          </div>
          <div class="list-item__icon flex flex-center">
            <router-link
              :to="`/stats/${test.hash}`"
              title="Статистика"
              class="flex flex-center"
            >
              <img src="/pictures/circle.svg" width="30px">
            </router-link>
          </div>
          <div class="list-item__icon list-item__icon-delete flex flex-center">
            <span
              @click="showModal(test.id, key)"
              class="flex flex-center"
              title="Удалить"
            >
              <img src="/pictures/trash.svg" class="pointer" width="22px">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="list-empty" v-if="postTests.length === 0">
      У вас пока нет тестов.
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

import PenSVG from '/public/Vectors/pen30.svg'

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
    DeleteModal, PenSVG
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
    },

    sliceDescription(description) {
      return description
      /* if(description) {
        if(description.length > 200) return description.slice(0, 350) + '...'
        if(description.length > 0) return description
      }
      else {
        return ''
      } */
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/list.scss";
</style>
