<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="poll">
        <div class="poll__block">
          <h1>Опрос</h1>
          <template>
            <h3>{{ pollName }}</h3>
            <span>{{ pollDescription }}</span>
            <div class="test__image mt5" v-if="image.link != null">
              <img :src="image.link" />
            </div>
            <VariantFewOutput
              :variants="variants"
              :selected="selected"
              @ready="selected = $event"
              v-if="type == 'Несколько из списка'"
            />
            <VariantOneOutput
              :variants="variants"
              :selected="selected"
              @ready="selected = $event"
              v-if="type == 'Один из списка'"
            />
            <button
              class="button button_type-index button_theme-blue mt6"
              @click="sendPoll"
            >
              Отправить
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue"
import VariantFewOutput from "@/components/Polls/VariantFewOutput.vue";
import VariantOneOutput from "@/components/Polls/VariantOneOutput.vue";

export default {
  name: "MakePoll",
  data() {
    return {
      pollId: "",
      pollName: "",
      pollDescription: "",
      variants: [],
      selected: [],
      type: '',
      image: {
        data: null,
        link: null,
      },
    };
  },
  components: {
    Header,
    VariantOneOutput,
    VariantFewOutput
  },
  methods: {
    sendPoll() {
      if(this.selected.length == 0) {
        alert("Вы не выбрали ни одного варианта");
        return
      }
      if(!this.selected.isArray) {
        this.selected = [this.selected]
      }
      axios
        .post("pollAnswers/send", {
          selected: this.selected,
          pollId: this.pollId,
        })
        .then(() => {
          alert("Опрос успешно отправлен");
          this.$router.push({name: 'List'})
        });
    },
  },
  mounted() {
    axios.get("poll/getByHash/" + this.$route.params.hash).then((res) => {
      res = res.data.data;

      this.pollId = res.id;
      this.pollName = res.pollName;
      this.pollDescription = res.pollDescription;
      this.variants = JSON.parse(res.variants);
      this.type = res.typeVariants;
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
</style>
