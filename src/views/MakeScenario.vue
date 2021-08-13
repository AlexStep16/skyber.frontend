<template>
  <div class="container flex flex-justify-center"
        @mouseup="RESIZER_imageMouseUp($event, currentResizingImage)"
        @touchend="RESIZER_imageMouseUp($event, currentResizingImage)"
        @mousemove="RESIZER_imageMouseMove($event, currentResizingImage)"
        @touchmove="RESIZER_imageMouseMove($event, currentResizingImage)"
  >
    <Header type="тесты" :save="true" @save="saveScenario" />
    <div class="main-wraper">
      <div class="main">
        <div class="scenario bg-white-shadow">
          <h2 class="scenario__h2 h2-default mt0">Редактирование сценария</h2>
          <input
            type="text"
            name="scen-name"
            id="scena-name"
            placeholder="Введите имя сценария"
            class="scenario__input input"
            v-model="scenario.name"
            maxlength="200"
          />
          <textarea-autosize
            type="text"
            name="scena-header"
            id="scena-header"
            placeholder="Заголовок результата"
            class="scenario__header input mt5"
            v-model="scenario.header"
            rows="1"
            maxlength="300"
          /><br />
          <tiptap 
            class="tiptap dashed-list mt5"
            placeholder="Введите описание результата"
            v-model="scenario.description"
          />
          <input type="file" @change="uploadImage" multiple ref="scenarioImage" hidden>
          <DragAndDropImage 
            v-if="scenario.images.length <= 10" 
            @clickImage="clickImage"
            :files="scenario.images"
            @drop="dropImage($event)"
            class="mt7"
          />

          <div class="scenario-image mt6" :style="{textAlign: img.align}" v-for="(img, key) in scenario.images" :key="key">
            <div class="scenario-image__wraper" tabindex="0">
              <img :src="img.original_url" :width="img.width" />
              <div class="image-resizer">
                <div 
                  class="image-resizer__circle image-resizer__circle-left" 
                  style="bottom: -10px; left: -10px" 
                  :style="img.align !== 'right' ? 'display:none' : ''"
                  :ref="'imageCircleUp1' + img.id + key"
                  @mousedown="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientHeight, 'left'); currentResizingImage = img"
                  @touchstart="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientHeight, 'left'); currentResizingImage = img"
                ></div>
                <div class="image-resizer__circle" 
                    style="bottom: -10px; right: -10px"
                    :style="img.align === 'right' ? 'display:none' : ''"
                    :ref="'imageCircleUp2' + img.id + key"
                    @mousedown="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientHeight); currentResizingImage = img"
                    @touchstart="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientHeight); currentResizingImage = img"
                ></div>
              </div>
              <div class="image-menu">
                <div class="image-menu__inner inline-flex flex-center">
                  <div @click="imageAlign(img, 'left')"><AlignLeftSVG /></div>
                  <div @click="imageAlign(img, 'center')"><AlignCenterSVG /></div>
                  <div @click="imageAlign(img, 'right')"><AlignRightSVG /></div>
                  <div @click="deleteImage(img, key)"><DeleteSVG /></div>
                </div>
              </div>
            </div>
            <div class="modal modal_white absolute" v-if="imageLoading">
              <Loader />
            </div>
          </div>
        </div>
      </div>
      <MakeFooter type="scenario" @save="saveScenario" />
      <InfoModal :message="infoMessage" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import MakeFooter from "@/components/MakeFooter.vue";
import Tiptap from '@/components/TipTap.vue'
import Loader from "@/components/Loader.vue";
import DragAndDropImage from "@/components/DragAndDropImage.vue";
import InfoModal from "@/components/InfoModal.vue";

import DeleteSVG from '/public/pictures/trash-menu.svg'
import AlignLeftSVG from '/public/pictures/align_left.svg'
import AlignCenterSVG from '/public/pictures/align_center.svg'
import AlignRightSVG from '/public/pictures/align_right.svg'

export default {
  name: "MakeScenario",
  data() {
    return {
      scenario: {
        id: this.$route.params.id,
        testHash: null,
        name: '',
        header: '',
        description: '',
        images: [],
      },
      showContent: false,
      infoMessage: {},
      imageLoading: false,
      fingerprint: window.VISITOR_ID,
      currentResizingImage: {},
    }
  },
  components: {
    MakeFooter, Header,
    Tiptap, Loader, DragAndDropImage,
    InfoModal, DeleteSVG, AlignLeftSVG,
    AlignCenterSVG, AlignRightSVG,
  },
  methods: {
    saveScenario() {
      if(this.scenario.name.length === 0) {
        this.infoMessage = {body: 'Вы не ввели имя сценария', type: 'danger'}
        return false;
      }
      if(this.scenario.name.length > 200) {
        this.infoMessage = {body: 'Имя сценария не может быть больше 200 символов', type: 'danger'}
        return false;
      }
      if(this.scenario.header.length > 300) {
        this.infoMessage = {body: 'Заголовок результата не может быть больше 300 символов', type: 'danger'}
        return false;
      }
      if(this.scenario.description.replace(/<[^<>]+>/g, "").length > 3000) {
        this.infoMessage = {body: 'Описание не может быть больше 3000 символов', type: 'danger'}
        return false;
      }
      axios.post('scenario/edit/' + this.$route.params.id, this.scenario).then(() => {
        this.$router.push('/test/scenario/menu/' + this.scenario.testHash)
      })
    },
    getScenario() {
      axios.get('scenario/' + this.$route.params.id).then(res => {
        res = res.data.data
        this.scenario.id = res.id
        this.scenario.description = res.description || ''
        this.scenario.header = res.header || ''
        this.scenario.name = res.name || ''

        for(let key in res.imageLink) {
          this.$set(this.scenario.images, key, res.imageLink[key])
        }

        this.scenario.testHash = res.testHash
      })
    },
    clickImage() {
      this.$refs.scenarioImage.click()
    },
    deleteImage(image, key) {
      if(image.id) {
        axios.post("scenario/upload/delete", { scenarioId: this.scenario.id, id: image.id }).then(() => {
          this.$delete(this.scenario.images, key);
        });
      }
    },
    dropImage(files) {
      let obj = {target: {files:files, value: ''}}
      this.uploadImage(obj)
    },
    uploadImage(event) {
      this.imageLoading = true
      let files = event.target.files
      const fd = new FormData();
      let count = 0
      for (let i in files) {

        if(files[i].size > 5999999) {
          this.infoMessage = {body: 'Файл не должен превышать 5мб', type: 'danger'}
          continue
        }
        if (Object.prototype.hasOwnProperty.call(files,i)) {
          fd.append(`scenarioImage${count}`, files[i])
          fd.append(`imageType${count}`, files[i].type.split('/')[1])
          count++
        }
      }
      
      fd.append('countImages', count)
      fd.append("scenarioId", this.scenario.id)
      
      if (!this.scenario.images && this.scenario.images.length === 0) return;
      
      axios.post("scenario/upload", fd).then((res) => {
        let images = res.data.data.imageLink
        console.log(images)
        for(let key in images) {
          this.$set(this.scenario.images, key, images[key])
        }
        this.imageLoading = false
      })
      .catch(() => {
        //this.showImagePreloader = false
        this.infoMessage = {body: 'Не удалось загрузить изображения. Попробуйте позже', type: 'danger'}
      });
      event.target.value = '';
    },
    imageAlign(image, direction) {
      image.align = direction
      axios.post('/scenario/image/alignment', {align: direction, media_id: image.id}).then(() => {
        
      })
    },
    RESIZER_imageMouseUp(event, img) {
      if(img.activateOver) {
        img.activateOver = false
        axios.post('/test/image/size', img).then(res => {
          console.log(res)
        })
      }
    },
  },
  beforeMount() {
    this.$store.commit('SHOW_LOADER')
    axios.post('/scenarios/check/access/', {
      fingerprint: this.fingerprint,
      hash: this.$route.params.hash,
      scenario_id: this.$route.params.id,
    }).then((res) => {
      if(res.status === 200) {
        this.scenario.testHash = this.$route.params.hash
        this.getScenario()
        this.showContent = true
        this.$store.commit('HIDE_LOADER')
      }
      else {
        this.$router.push({name: 'List'})
      }
    }).catch(() => {
      this.$router.push({name: 'List'})
    })
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/scenario.scss";
@import "@/common.blocks/tiptap.scss";
@import "@/common.blocks/index.scss";
</style>
