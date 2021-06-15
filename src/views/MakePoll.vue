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
          <div v-show="isPreview">
            <h1 class="poll-tag">Опрос</h1>
            <h3 class="poll-name mt7 mb7">{{ pollName }}</h3>
            <span class="poll-description">{{ pollDescription }}</span>
            <div v-if="pollVideoLink" class="test-video mt6 mb6">
              <youtube :video-id="pollVideoLink">
              </youtube>
            </div>
            <div class="test-image mt5 mb7" v-if="image.link != null">
              <div class="test-image__wraper">
                <img :src="image.link" />
              </div>
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
          </div>

          <div v-show="!isPreview">
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
            <div class="test-video-wraper mt6" v-if="pollVideoLink">
              <div class="modal modal_white absolute" v-if="!videoLoadDone">
                <Loader />
              </div>
              <div class="test-video-menu pointer flex-center bg-white-shadow" @click="deleteVideo">
                <img src="/pictures/trash.svg" width="21px" />
              </div>
              <youtube id="youtube" ref="youtube" :video-id="pollVideoLink" class="test-video">
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
            <div class="test-image mt6" v-if="showImagePreloader">
              <div class="test-image__wraper">
                <img :src="image.link" />
                <div class="modal-inner modal50 pointer flex flex-center">
                  <img src="/pictures/trash.svg" width="65px" @click="deleteImage" />
                </div>
              </div>
              <div class="modal modal_white absolute" v-if="imageLoading">
                <Loader />
              </div>
            </div>
            <MultiselectPollIcons :typeVariants="typeVariants" @selected="typeVariants = $event" />

            <div class="mt5">
              <div
                class="test-question mt6"
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
              
            </div>
            <div class="test__add-variant pointer mt5" @click="addVariant()">
              Добавить вариант
            </div>
          </div>
        </div>
      </div>
    </div>
    <MakeFooter type="poll" :link="pollLink" @save="savePoll" @preview="isPreview = !isPreview" />
    <SuccessModal v-if="showSuccess" :edit="true" :message="successMessage" :link="pollHash" type="poll" />
  </div>
</template>

<script>
// @ is an alias to /src
//import RegisterForm from '@/components/RegisterForm.vue';
import axios from "axios";
import { mapMutations } from "vuex";
import { getIdFromUrl } from 'vue-youtube'
import Loader from "@/components/Loader.vue";

import Header from "@/components/Header.vue";
import MultiselectPollIcons from "@/components/Multiselect/MultiselectPollIcons";
import VariantFewOutput from "@/components/MakePoll/VariantFewOutput.vue";
import VariantOneOutput from "@/components/MakePoll/VariantOneOutput.vue";
import SuccessModal from "@/components/SuccessModal.vue";

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
      fingerprint: window.VISITOR_ID,
      showSuccess: false,
      successMessage: '',
      videoLoadDone: false,
      imageLoading: false,
      showImagePreloader: false,
    };
  },
  components: {
    Header,
    MultiselectPollIcons,
    VariantFewOutput,
    VariantOneOutput,
    MakeFooter, SuccessModal,
    Loader
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
      axios.post("poll/save", poll).then(() => {
        if(this.pollHash == this.$store.state.pollStore.draftHash) this.CLEAR_POLL_DRAFT()
        this.successMessage = "Успешно сохранено"
        this.showSuccess = true
      });
    },

    deleteVariant(index) {
      this.variants.splice(index, 1);
    },

    uploadImage(event) {
      this.showImagePreloader = true
      this.imageLoading = true

      this.image.data = event.target.files[0];
      const fd = new FormData();
      this.image.data != undefined
        ? fd.append("pollImage", this.image.data)
        : "";
      fd.append("pollHash", this.pollHash);

      if (!this.image.data) return;

      axios.post("poll/upload", fd).then((res) => {
        this.imageLoading = false
        this.image.link = res.data.image;
      })
      .catch(() => {
        this.showImagePreloader = false
      });
    },

    deleteImage() {
      axios.post("poll/upload/delete", { pollHash: this.pollHash }).then(() => {
        this.image.link = null;
        this.showImagePreloader = false
      });
    },

    clickImage() {
      this.$refs.imageInput.click();
    },
    saveLink() {
      this.pollVideoLink = getIdFromUrl(this.$refs.linkInput.value)
      this.hideVideoBox = true
    },
    deleteVideo() {
      this.pollVideoLink = null
    },
    //Mounted methods
    getPoll(hash) {
      this.showImagePreloader = true
      this.imageLoading = true

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
        if(this.image.link != null) {
          this.imageLoading = false
        }
        else {
          this.showImagePreloader = false
        }
        this.pollVideoLink = res.videoLink
        this.pollLink = "https://skyber.ru/polls/" + res.hash;
      }).catch(() => {
        let hashStore = this.$store.state.pollStore.draftHash
        if(hashStore != null && hash == hashStore) {
          this.CLEAR_POLL_DRAFT()
        }
        this.$router.replace('/404')
      }).finally(() => {
        this.$store.commit('HIDE_LOADER')
      });
    }
  },
  mounted() {
    this.$store.commit('SHOW_LOADER')
    if (this.pollHash && this.pollHash != '') {
      this.getPoll(this.pollHash);
    }

    this.$nextTick(function() {
      if(this.$refs.youtube) {
        this.videoLoadDone = true
      }
      else {
        let th = this
        let intervalID = setInterval(function() {
          if(th.$refs.youtube) {
            th.videoLoadDone = true
          }
        }, 1000)
        if(this.videoLoadDone == true) clearInterval(intervalID)
      }
    })
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
@import "@/common.blocks/custom-multiselect.scss";

</style>
