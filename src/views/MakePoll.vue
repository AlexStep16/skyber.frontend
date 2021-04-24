<template>
  <div class="container body">
    <Header />
    <div class="main">
      <div class="poll">
        <div class="poll__block_wraper" v-if="!isPreview">
          <div class="side-panel inline-block">
            <div class="side-panel-inner pb6 flex flex-center flex-vertical">
              <div class="pointer mt6 text-center" @click="clickImage">
                <img src="/pictures/image.svg" width="32px">
              </div>
              <div class="mt6 text-center">
                <img src="/pictures/video.svg" width="32px">
              </div>
            </div>
          </div>
        </div>
        <div class="poll__block bg-white-shadow">
          <template v-if="isPreview">
            <h1 class="poll-tag">Опрос</h1>
            <h3 class="poll-name mt7 mb7">{{ pollName }}</h3>
            <span class="poll-description">{{ pollDescription }}</span>
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
              class="button button_type-index button_theme-blue mt6"
              @click="isPreview = false"
            >
              Редактировать
            </button>
          </template>

          <template v-else>
            <h2 class="poll-tag">Опрос</h2>
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
                <span @click="deleteVariant(index)">
                  <img src="/pictures/trash.svg" width="19px" />
                </span>
              </div>
              <div class="test__add-variant pointer mt5" @click="addVariant()">
                Добавить вариант
              </div>
              <button
                class="button button_type-index button_theme-blue mt6"
                @click="savePoll"
              >
                Предпросмотр
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import RegisterForm from '@/components/RegisterForm.vue';
import axios from "axios";
import store from "../store";
import { mapMutations } from "vuex";

import Header from "@/components/Header.vue";
import Multiselect from "vue-multiselect";
import VariantFewOutput from "@/components/MakePoll/VariantFewOutput.vue";
import VariantOneOutput from "@/components/MakePoll/VariantOneOutput.vue";

export default {
  name: "MakePoll",
  data() {
    return {
      pollId: "",
      pollName: "",
      pollDescription: "",
      variants: [],
      isPreview: false,
      typeVariants: "",
      options: ["Один из списка", "Несколько из списка"],
      image: {
        data: null,
        link: null
      },
    };
  },
  components: {
    Header,
    Multiselect,
    VariantFewOutput,
    VariantOneOutput,
  },
  methods: {
    ...mapMutations(["SET_POLL", "CLEAR_POLL"]),
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
      };
      axios.post("poll/save", poll).then(() => {
        this.isPreview = true;
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

    //Mounted methods
    getPoll() {
      axios.get("poll/" + this.pollId).then((res) => {
        if(!res) {
          this.CLEAR_TEST()
          location.reload()
        }
        res = res.data.data;
  
        this.pollName = res.pollName;
        this.pollDescription = res.pollDescription;
        this.variants = JSON.parse(res.variants);
        this.typeVariants = res.typeVariants
        this.image.link = res.imageLink
      }).catch((error) => {
        if(error.response.status == 404) {
          this.CLEAR_TEST()
          location.reload()
        }
      });
    }
  },
  mounted() {
    if (!store.getters['auth/authenticated'] && !this.$store.state.pollStore.id) {
      axios
        .post("poll/create", this.form)
        .then((res) => {
          this.pollId = res.data.data.id;
          this.SET_POLL({id: res.data.data.id});
          this.getPoll(res.data.data.id);
        })
    }
    else if (!store.getters['auth/authenticated'] && this.$store.state.pollStore.id) {
      axios.post("poll/checkIp", {poll_id: this.$store.state.pollStore.id, }).then((res) => {
        if(res.data) {
          this.pollId = this.$store.state.pollStore.id;
          this.getPoll(this.pollId);
        }
        else {
          axios
          .post("poll/create", this.form)
          .then((res) => {
            this.pollId = res.data.data.id;
            this.SET_POLL({id: res.data.data.id});
            this.getPoll(res.data.data.id);
          })
        }
      });
    }
    else if (store.getters['auth/authenticated'] && this.$store.state.pollStore.id) {
      this.pollId = this.$store.state.pollStore.id;
      this.getPoll(this.pollId);
    }
    else if (store.getters['auth/authenticated'] && !this.$store.state.pollStore.id) {
      axios
      .post("poll/create", this.form)
      .then((res) => {
        this.pollId = res.data.data.id;
        this.SET_POLL({id: res.data.data.id});
        this.getPoll(res.data.data.id);
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/makepoll.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/form-radio_type-main.scss";
</style>
