<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="poll">
        <div class="poll__block">
          <h1>Опрос</h1>
          <template v-if="isPreview">
            <h3>{{ pollName }}</h3>
            <span>{{ pollDescription }}</span>
            <div class="test__image mt5" v-if="image.link != null">
              <img :src="image.link" />
            </div>
            <br /><br />
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
              v-if="image.link == null"
            />
            <button
              class="button button_type-question button_theme-red"
              @click.prevent="deleteImage"
              v-if="image.link != null"
            >
              Удалить изображение
            </button>
            <div class="test__image" v-if="image.link != null">
              <img :src="image.link" />
            </div>
            <multiselect
              v-model="typeVariants"
              :options="options"
              class="mt5"
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
                <button
                  class="button button_type-index"
                  @click="deleteVariant(index)"
                >
                  Удалить
                </button>
              </div>
              <input
                type="text"
                class="input input_type-test-small"
                placeholder="Добавить вариант"
                @click="addVariant()"
                readonly
              />
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
      }
    };
  },
  components: {
    Header,
    Multiselect,
    VariantFewOutput,
    VariantOneOutput,
  },
  methods: {
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
  },
  mounted() {
    if (!this.$store.state.pollStore.id) {
      this.$router.push({ name: "Options" });
    }

    this.pollId = this.$store.state.pollStore.id;

    axios.get("poll/" + this.pollId).then((res) => {
      res = res.data.data;

      this.pollName = res.pollName;
      this.pollDescription = res.pollDescription;
      this.variants = JSON.parse(res.variants);
      this.typeVariants = res.typeVariants
      this.image.link = res.imageLink
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/makepoll.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/form-radio_type-main.scss";
</style>
