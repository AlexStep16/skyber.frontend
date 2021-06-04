<template>
  <div class="container flex flex-justify-center">
    <Header type="test" />
    <div class="main">
      <div class="scenario bg-white-shadow">
        <h2 class="scenario__h2 h2-default">{{ isEdit ? 'Редактирование' : 'Добавление' }} сценария</h2>
        <input
          type="text"
          name="scen-name"
          id="scena-name"
          placeholder="Введите имя сценария"
          class="scenario__input input"
          v-model="scenario.name"
        /><br>
        <input
          type="text"
          name="scena-header"
          id="scena-header"
          placeholder="Заголовок результата"
          class="scenario__input input"
          v-model="scenario.header"
        /><br />
        <tiptap 
          class="tiptap mt5"
          placeholder="Введите здесь текст который увидит человек после прохождения теста"
          v-model="scenario.description" 
        />
        <input type="file" @change="uploadImage">
        <h2 class="h2-default">Предпросмотр</h2>
        <h1 class="scenario__header-preview">{{ scenario.header }}</h1>
        <div class="scenario__description mt0" v-html="scenario.description"></div>
        <div class="scenario__image">
          <img :src="scenario.imageSrc">
        </div>
      </div>
    </div>
    <MakeFooter type="scenario" @save="saveScenario" />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import MakeFooter from "@/components/MakeFooter.vue";
import Tiptap from '@/components/TipTap.vue'

export default {
  name: "MakeScenario",
  props: ['isEdit'],
  data() {
    return {
      scenario: {
        testHash: this.$route.params.hash,
        name: '',
        header: '',
        description: '',
        image: null,
        imageSrc: '',
      }
    }
  },
  components: {
    Header,
    MakeFooter,
    Tiptap
  },
  methods: {
    saveScenario() {
      const formData = new FormData();
      this.scenario.image != null
        ? formData.append("scenaImage", this.scenario.image)
        : "";
      formData.append("scenario", JSON.stringify(this.scenario))
      if(!this.isEdit) {
        axios.post('scenarios/create', formData).then((res) => {
          console.log(res)
        })
      } else {
        axios.post('scenario/edit/' + this.$route.params.id, formData).then((res) => {
          console.log(res)
        })
      }
    },
    getScenario() {
      axios.get('scenario/' + this.$route.params.id).then(res => {
        res = res.data.data
        this.scenario.id = res.id
        this.scenario.description = res.description
        this.scenario.header = res.header
        this.scenario.name = res.name
        this.scenario.imageSrc = res.imageLink
      })
    },
    uploadImage(event) {
      this.scenario.image = event.target.files[0];
      if (!this.scenario.image) return;

      this.scenario.imageSrc = URL.createObjectURL(this.scenario.image);
    },
  },
  mounted() {
    if(this.isEdit) {
      this.getScenario()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/scenario.scss";
</style>
