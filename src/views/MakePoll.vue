<template>
  <div class="container flex flex-justify-center">
    <Header type="poll" />
    <div class="main">
      <div class="poll">
        <div class="poll__block_wraper" v-if="!isPreview">
          <div class="side-panel inline-block">
            <div class="side-panel-inner pb6 flex flex-center flex-vertical">
              <div class="pointer mt6 text-center" @click="clickImage">
                <img src="/pictures/image.svg" width="32px">
              </div>
              <div class="mt6 text-center pointer">
                <img src="/pictures/video.svg" width="32px" @click="hideVideoBox = !hideVideoBox">
              </div>
            </div>
          </div>
        </div>
        <div class="poll__block bg-white-shadow">
          <template v-if="isPreview">
            <h3 class="poll-name mt7 mb7">{{ pollName }}</h3>
            <span class="poll-description">{{ pollDescription }}</span>
            <div :class="!pollVideoLink ? 'd-none' : 'test-video mt6 mb6'">
              <youtube :video-id="pollVideoLink">
              </youtube>
            </div>
            <div class="test__image mt5 mb7" v-if="image.link != null">
              <img :src="image.link" />
            </div>
            <VariantFewOutput
              :variants="variants"
              v-if="typeVariants == 'Несколько из списка'"
            />
            <VariantOneOutput
              :variants="variants"
              v-if="typeVariants == 'Один из списка'"
            />
            <button
              class="test__add-variant pointer mt6"
              @click="isPreview = false"
            >
              Редактировать
            </button>
          </template>

          <template v-else>
            <input
              type="text"
              class="input input_type-test"
              v-model="pollName"
              placeholder="Название опроса"
            />
            <input
              type="text"
              class="input input_type-test-small"
              v-model="pollDescription"
              placeholder="Описание опроса"
            />
            <div :class="!pollVideoLink ? 'd-none' : 'test-video mt6 mb6'">
              <youtube :video-id="pollVideoLink">
              </youtube>
            </div>
            <div class="test-add-video-block flex flex-center mt5" v-if="!hideVideoBox">
              <div class="test-add-video-block__modal flex flex-column">
                <input type="text" class="input" ref="linkInput" placeholder="Введите ссылку на YouTube видео">
                <button class="button button-theme-blue" @click.prevent="saveLink">Добавить</button>
              </div>
            </div>
            <input
              type="file"
              name="image"
              @change="uploadImage"
              ref="imageInput"
              hidden
              v-if="image.link == null"
            />
            <div class="test__image mt5 mb5" v-if="image.link != null">
              <div class="modal modal50 pointer flex flex-center">
                <img src="/pictures/trash.svg" width="65px" @click="deleteImage" />
              </div>
              <img :src="image.link" />
            </div>
            <multiselect
              v-model="typeVariants"
              :options="options"
              class="mt5"
              :allow-empty="false"
              :multiple="false"
              selectLabel=""
              selectedLabel=""
              deselectLabel=""
              :placeholder="'Выберите тип ответа'"
            ></multiselect>

            <div class="mt5">
              <div
                class="test__question mt6"
                v-for="(variant, index) in variants"
                :key="variant.id"
              >
                <input
                  type="text"
                  class="input input_type-test-small"
                  placeholder="Напишите здесь вариант ответа"
                  v-model="variant.name"
                  @focusout="checkIsEmpty(variant, index)"
                />
                <span class="pointer" @click="deleteVariant(index)">
                  <img src="/pictures/trash.svg" width="19px" />
                </span>
              </div>
              <div class="test__add-variant pointer mt5" @click="addVariant()">
                Добавить вариант
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <MakeFooter type="poll" :link="pollLink" @save="savePoll" @preview="isPreview = !isPreview" />
  </div>
</template>

<script>
// @ is an alias to /src
//import RegisterForm from '@/components/RegisterForm.vue';
import axios from "axios";
import { mapMutations } from "vuex";
import { getIdFromUrl } from 'vue-youtube'

import Header from "@/components/Header.vue";
import Multiselect from "vue-multiselect";
import VariantFewOutput from "@/components/MakePoll/VariantFewOutput.vue";
import VariantOneOutput from "@/components/MakePoll/VariantOneOutput.vue";

import MakeFooter from "@/components/MakeFooter.vue";

export default {
  name: "MakePoll",
  props: ['hash'],
  data() {
    return {
      pollId: null,
      pollName: "",
      pollDescription: "",
      pollLink: "",
      pollVideoLink: '',
      hideVideoBox: true,
      variants: [],
      isPreview: false,
      typeVariants: "",
      options: ["Один из списка", "Несколько из списка"],
      image: {
        data: null,
        link: null
      },
      pollHash: this.hash,
      fingerprint: window.VISITOR_ID
    };
  },
  components: {
    Header,
    Multiselect,
    VariantFewOutput,
    VariantOneOutput,
    MakeFooter
  },
  methods: {
    ...mapMutations(["CLEAR_POLL_DRAFT"]),
    addVariant() {
      let variants = this.variants;
      let length = variants.length;
      let lastIndex = length - 1;
      if (lastIndex < 0) {
        variants.push({
          id: 0,
          name: "Вариант 1",
        });
        return;
      }
      if (variants[lastIndex].name != null) {
        variants.push({
          id: length,
          name: "Вариант " + ++length,
        });
      }
    },
    checkIsEmpty(variant, index) {
      if (variant.name == "") {
        variant.name = "Вариант " + ++index;
      }
    },
    savePoll() {
      let poll = {
        pollId: this.pollId,
        pollName: this.pollName,
        pollDescription: this.pollDescription,
        variants: this.variants,
        typeVariants: this.typeVariants,
        videoLink: this.pollVideoLink,
        fingerprint: this.fingerprint,
      };
      console.log(poll)
      axios.post("poll/save", poll).then(() => {
        if(this.pollHash == this.$store.state.pollStore.draftHash) this.CLEAR_POLL_DRAFT()
        this.$router.push('/polls/' + this.pollHash);
      });
    },

    deleteVariant(index) {
      this.variants.splice(index, 1);
    },

    uploadImage(event) {
      this.image.data = event.target.files[0];
      const fd = new FormData();
      this.image.data != undefined
        ? fd.append("pollImage", this.image.data)
        : "";
      fd.append("id", this.pollId);

      if (!this.image.data) return;

      axios.post("poll/upload", fd).then((res) => {
        this.image.link = res.data.image;
      });
    },

    deleteImage() {
      axios.post("poll/upload/delete", { id: this.pollId }).then(() => {
        this.image.link = null;
      });
    },

    clickImage() {
      this.$refs.imageInput.click();
    },
    saveLink() {
      this.pollVideoLink = getIdFromUrl(this.$refs.linkInput.value)
      this.hideVideoBox = true
    },

    //Mounted methods
    getPoll(hash) {
      axios.post("poll/", {hash: hash, fingerprint: this.fingerprint}).then((res) => {
        if(!res) {
          if(this.$store.state.pollStore.draftHash != null) this.CLEAR_POLL_DRAFT()
          this.$router.push('/poll/create')
        }
        res = res.data.data;
  
        this.pollId = res.id;
        this.pollName = res.pollName;
        this.pollDescription = res.pollDescription;
        this.variants = JSON.parse(res.variants) || [];
        this.typeVariants = res.typeVariants
        this.image.link = res.imageLink
        this.pollVideoLink = res.videoLink
        this.pollLink = "https://skyber.ru/polls/" + res.hash;
      }).catch(() => {
        let hashStore = this.$store.state.pollStore.draftHash
        if(hashStore != null && hash == hashStore) {
          this.CLEAR_POLL_DRAFT()
        }
        this.$router.replace('/404')
      });
    }
  },
  mounted() {
    if (this.pollHash && this.pollHash != '') {
      this.getPoll(this.pollHash);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/makepoll.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/form-radio_type-main.scss";
</style>
