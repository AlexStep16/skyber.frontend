<template>
  <div>
    <div class="main">
      <div class="scenario bg-white-shadow">
        <h2 class="scenario__h2 h2-default mt0">{{ isEdit ? 'Редактирование' : 'Добавление' }} сценария</h2>
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
          class="scenario__input input mt5"
          v-model="scenario.header"
        /><br />
        <tiptap 
          class="tiptap mt7"
          placeholder="Введите здесь текст который увидит человек после прохождения теста"
          v-model="scenario.description" 
        />
        <input type="file" ref="scenarioImage" hidden>
        <DragAndDropImage :files="scenario.image" @drop="dropImage" />
        <h2 class="h2-default mt7 mb0">Предпросмотр</h2>
        <h1 class="scenario__header-preview mb0" v-if="scenario.header">{{ scenario.header }}</h1>
        <div class="scenario__description mt6" v-if="scenario.description" v-html="scenario.description"></div>
        <div class="scenario-image mt6" v-if="scenario.imageSrc">
          <div class="scenario-image__wraper">
            <img :src="scenario.imageSrc" />
            <div class="modal-inner modal50 pointer flex flex-center">
              <img src="/pictures/trash.svg" width="65px" @click="deleteImage" />
            </div>
          </div>
          <div class="modal modal_white absolute" v-if="imageLoading">
            <Loader />
          </div>
        </div>
      </div>
    </div>
    <MakeFooter type="scenario" @save="saveScenario" />
  </div>
</template>

<script>
import axios from "axios";
import MakeFooter from "@/components/MakeFooter.vue";
import Tiptap from '@/components/TipTap.vue'
import Loader from "@/components/Loader.vue";
import DragAndDropImage from "@/components/DragAndDropImage.vue";

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
        image: [],
        imageSrc: '',
      },
      imageLoading: false,
    }
  },
  components: {
    MakeFooter,
    Tiptap, Loader, DragAndDropImage
  },
  methods: {
    saveScenario() {
      const formData = new FormData();
      console.log(this.scenario.image[0])
      this.scenario.image.length > 0
        ? formData.append("scenaImage", this.scenario.image[0])
        : "";
      formData.append("scenario", JSON.stringify(this.scenario))
      if(!this.isEdit) {
        axios.post('scenarios/create', formData).then(() => {
          this.$router.push('/test/scenario/menu/' + this.scenario.testHash)
        })
      } else {
        axios.post('scenario/edit/' + this.$route.params.id, formData).then(() => {
          this.$router.push('/test/scenario/menu/' + this.scenario.testHash)
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
        this.scenario.testHash = res.testHash
      })
    },
    clickImage() {
      this.$refs.scenarioImage.click()
    },
    deleteImage() {
      this.scenario.image = []
      this.scenario.imageSrc = null
    },
    dropImage() {
      this.imageLoading = true
      console.log(1)
      if (!this.scenario.image || this.scenario.image.length === 0) return;
      this.scenario.imageSrc = URL.createObjectURL(this.scenario.image[0]);
      this.imageLoading = false
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
@import "@/common.blocks/index.scss";
</style>
