<template>
  <div class="modal modal_white-transparent flex flex-center">
    <div class="modal-container">
      <div
        class="popup-success bg-white-shadow flex flex-align-start flex-vertical"
      >
        <h2
          class="popup-success__message popup-success__message-success flex flex-center mt0"
        >
          <SuccessSVG />{{ message }}
        </h2>
        <div class="popup-success__link flex flex-align-end" v-if="!justSave">
          <div class="flex flex-vertical" style="flex: auto">
            <span class="popup-success__link-span">Ссылка на {{ type == "test" ? "тест" : "опрос" }}</span>
            <input
              type="text"
              v-model="this.url"
              ref="linkInput"
              class="make-footer__link mt3"
              @click="$refs.linkInput.select()"
              readonly
            />
          </div>
          <div class="popup-success__copy-link ml5 mb5 pointer" v-if="!wasCopied" @click="copy">
            Скопировать ссылку
          </div>
          <div class="popup-success__copy-link ml5 mb5 pointer" v-if="wasCopied" @click="copy">
            Cкопировано
          </div>
        </div>
        <div class="popup-success__social mt7">
          <div class="popup-success__social-block" v-if="!justSave">
            <ShareNetwork
              network="vk"
              :url="url"
              :title="title"
              hashtags="skyber,tests,тесты"
            >
              <Vk />
            </ShareNetwork>
            <ShareNetwork
              network="twitter"
              :url="url"
              :title="title"
              hashtags="skyber,tests,тесты"
            >
              <Twitter />
            </ShareNetwork>
            <ShareNetwork
              network="facebook"
              :url="url"
              :title="title"
              hashtags="skyber,tests,тесты"
            >
              <Facebook />
            </ShareNetwork>
          </div>
          <div>
            <router-link
              :to="(type=== 'test' ? '/tests/' : '/polls/') + link"
              class="button button-clasic button_theme-roboto_small button_theme-purple"
              style="font-size: 0.85em"
              v-if="edit"
              >Перейти к {{ type == "test" ? "тесту" : "опросу" }}</router-link
            >
            <div
              @click="$emit('resend')"
              v-else-if="resend"
              class="button button-clasic button_theme-roboto_small button_theme-purple"
              >Перепройти {{ type == "test" ? "тест" : "опрос" }}</div
            >
            <div
              @click="$emit('go')"
              v-else
              class="button button-clasic button_theme-roboto_small button_theme-purple"
              >Вернуться к {{ type == "test" ? "тесту" : "опросу" }}</div
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SuccessSVG from "/public/pictures/success.svg";
import Vk from "/public/pictures/vk36.svg";
import Twitter from "/public/pictures/twitter36.svg";
import Facebook from "/public/pictures/facebook36.svg";

export default {
  name: "SuccessModal",
  props: ["link", "type", "message", "edit", "resend", "justSave"],
  data() {
    return {
      url: "",
      title: "",
      wasCopied: false,
    };
  },
  components: {
    SuccessSVG,
    Vk, Facebook, Twitter,
  },
  methods: {
    copy() {
      this.$refs.linkInput.select();
      document.execCommand("copy");
      this.wasCopied = true
    },
  },
  mounted() {
    this.url =
      this.type == "test"
        ? "https://skyber.ru/tests/" + this.link
        : "https://skyber.ru/polls/" + this.link;
    this.title =
      this.type == "test"
        ? "Я создал тест на платформе Skyber"
        : "Я создал опрос на платформе Skyber";
    document.addEventListener('keyup', (e) => {
      if(e.key == 'Escape') {
        this.$emit('closeModal')
      }
    })
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/index.scss";
@import "@/common.blocks/success-block.scss";
</style>
