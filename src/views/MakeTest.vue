<template>
  <div class="container flex flex-justify-center"
       @mouseup="RESIZER_imageMouseUp($event, currentResizingImage)"
       @mousemove="RESIZER_imageMouseMove($event, currentResizingImage)"
       @touchend="RESIZER_imageMouseUp($event, currentResizingImage)"
       @touchmove="RESIZER_imageMouseMove($event, currentResizingImage)"
  >
    <Header type="тесты" :save="true" @save="saveTest" />
    <div class="main">
      <div class="test-wrapper">
        <div class="test-settings-wrapper" style="position: relative" :class="tips.current === 6 ? 'z-index4' : ''">
          <Settings 
            :hash="test.hash" 
            :settings="settings"
            :class="tips.current === 5 ? 'z-index4' : ''"
            :tips="tips" 
          />
          <SimpleTip :tips="tips" class="tip-position-5" v-if="tips.current === 5" />
          <SimpleTip :tips="tips" class="tip-position-6" v-if="tips.current === 6" />
        </div>

        <div class="test inline-block mt7">
          <div class="test__block_wraper">

            <div class="side-panel inline-block" :class="[2, 3, 4].includes(this.tips.current) ? 'z-index4-665' : ''">
              <div class="side-panel-inner pt6 pb6 flex flex-center flex-vertical" v-if="testFocused">
                <div 
                  class="side-panel-tip-background z-index4" 
                  v-if="[2, 3, 4].includes(tips.current)"
                  :style="'top:' + (tips.current === 3 ? '51px' : (tips.current === 4 ? '99px' : ''))"
                ></div>

                <SimpleTip :tips="tips" class="tip-position-2" v-if="tips.current === 2" />
                <div class="side-panel-item pointer text-center mt0 ml0" :class="tips.current === 2 ? 'z-index4' : ''" @click="addQuestion(questions.length - 1)">
                  <AddSVG class="svg-desktop" style="position:absolute" />
                  <AddSVGMobile class="svg-mobile" style="position:absolute" />
                </div>

                <SimpleTip :tips="tips" class="tip-position-3" v-if="tips.current === 3" />
                <div class="side-panel-item pointer text-center" :class="tips.current === 3 ? 'z-index4' : ''" @click="clickImage">
                  <ImageSVG class="svg-desktop" />
                  <ImageSVGMobile class="svg-mobile" />
                </div>

                <SimpleTip :tips="tips" class="tip-position-4" v-if="tips.current === 4" />
                <div class="side-panel-item pointer text-center" :class="tips.current === 4 ? 'z-index4' : ''" @click="hideVideoBox = test.videoLink == null ? !hideVideoBox : hideVideoBox">
                  <VideoSVG class="svg-desktop"  />
                  <VideoSVGMobile class="svg-mobile wd100" />
                </div>
              </div>
            </div>
            
            <div class="test__block bg-white-shadow test__header"
                 :class="tips.current === 1 ? 'z-index4' : ''"
                 @click="testFocuse"
            >
              <SimpleTip :tips="tips" class="tip-position-1" v-if="tips.current === 1" />
              <div class="form form_type-test">
                <div class="flex">
                  <textarea-autosize
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Название теста"
                    class="input input_type-test textarea_type-test-header pb0 pt0"
                    v-model="test.name"
                    rows="1"
                    maxlength="300"
                  />
                </div>
                <div class="mt5">
                  <tip-tap-empty
                    class="tiptap dashed-list"
                    placeholder="Введите описание теста (доступен редактор)"
                    v-model="test.description" 
                  />
                </div>
                <div class="test-video-wraper mt6" v-if="test.videoLink">
                  <div class="modal modal_white modal-z-medium absolute" v-if="!videoLoadDone">
                    <Loader />
                  </div>
                  <div class="test-video-menu pointer flex-center bg-white-shadow" @click="deleteVideo">
                    <img src="/pictures/trash.svg" width="21px" />
                  </div>
                  <div class="test-video-delete-mobile mb2" :style="isTouchScreen ? 'display: block!important' : ''" @click="deleteVideo">
                    <button class="button button-clasic button_theme-red">Удалить видео</button>
                  </div>
                  <youtube id="youtube" ref="youtube" :video-id="test.videoLink" class="test-video">
                  </youtube>
                </div>
                <div class="test-add-video-block flex flex-center mt5" v-if="!hideVideoBox">
                  <div class="test-add-video-block__modal flex flex-column">
                    <input type="text" class="input test-add-video-block__input" ref="linkInput" placeholder="Введите ссылку на YouTube видео">
                    <button class="button button_theme-blue test-add-video-block__button" @click.prevent="saveLink">Добавить</button>
                  </div>
                </div>
                <input
                  type="file"
                  name="testImage"
                  ref="imageInput"
                  multiple
                  @change="uploadImage"
                  hidden
                  v-if="image.link == null"
                />
                <div :class="imageLoading ? 'test-image-preloader' : ''" v-if="showImagePreloader">
                  <div class="test-image-loader modal modal_white modal-z-medium absolute" v-if="imageLoading">
                    <Loader />
                  </div>
                  <div class="test-image mt6" 
                       :style="{textAlign: img.align}" 
                       v-for="(img, key) in image.data" 
                       :key="key"
                  >
                    <div class="test-image__wraper" tabindex="0">
                      <img :src="img.result || img.original_url" 
                           :width="img.width" 
                      />
                      <div class="image-resizer">
                        <div class="image-resizer__circle image-resizer__circle-left" 
                             style="bottom: -10px; left: -10px"
                             :style="img.align !== 'right' ? 'display:none' : ''"
                             :ref="'imageCircleUp1' + img.id + key"
                             @touchstart="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientHeight, 'left'); currentResizingImage = img"
                             @mousedown="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientHeight, 'left'); currentResizingImage = img"
                        ></div>
                        <div class="image-resizer__circle" 
                             style="bottom: -10px; right: -10px" 
                             :style="img.align === 'right' ? 'display:none' : ''"
                             :ref="'imageCircleUp2' + img.id + key"
                             @touchstart="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientHeight); currentResizingImage = img"
                             @mousedown="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientHeight); currentResizingImage = img"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <draggable v-model="questions" @end="dragEnd" handle=".drag">
            <div
              class="test__block_wraper mt7"
              v-for="(question, key) in questions"
              :key="key"
              @click="questionFocus(question)"
            >
              <div class="side-panel inline-block" v-if="question.focused">
                <div class="side-panel-inner pt6 pb6 flex flex-center flex-vertical">
                  <div class="side-panel-item pointer" @click="addQuestion(key)">
                    <AddSVG class="svg-desktop" style="position:absolute" />
                    <AddSVGMobile class="svg-mobile" style="position:absolute" />
                  </div>
                  <div class="side-panel-item pointer" @click="clickQuestionImage(question.id)">
                    <ImageSVG class="svg-desktop" />
                    <ImageSVGMobile class="svg-mobile" />
                  </div>
                  <div class="side-panel-item pointer" @click="clickQuestionVideo(question)">
                    <VideoSVG class="svg-desktop"  />
                    <VideoSVGMobile class="svg-mobile" />
                  </div>
                </div>
              </div>

              <template v-if="question.focused">
                <div class="test__block test__block_selected test__item bg-white-shadow">
                  <div
                    class="question-wrapper"
                    :ref="'question' + question.id"
                  >
                    <div class="question-flex">
                      <textarea-autosize
                        type="text"
                        name="names"
                        id="names"
                        placeholder="Напишите свой вопрос..."
                        class="test__input-question-name input input_type-option pl0 pr6"
                        v-model="question.name"
                        rows="1"
                        maxlength="300"
                      />
                      <div class="flex flex-center">
                        <span>
                          <img src="/pictures/move.svg" width="26px" class="drag pointer mr5" />
                        </span>
                        <span @click="copyQuestion(question)" class="pointer">
                          <img src="/pictures/copy.svg" width="21px" />
                        </span>
                        <span
                          @click="deleteQuestion(key, question.id)"
                          class="pointer ml5"
                        >
                          <img src="/pictures/trash.svg" width="21px" />
                        </span>
                      </div>
                    </div>
                    <!-- Блок с видео -->
                    <div class="test-video-wraper mt6" v-if="question.videoLink">
                      <!-- <div class="modal modal_white absolute" v-if="!question.videoLoadDone">
                        <Loader />
                      </div> -->
                      <div class="test-video-menu pointer flex-center bg-white-shadow" @click="questionDeleteVideo(question)">
                        <img src="/pictures/trash.svg" width="21px" />
                      </div>
                      <youtube id="youtube" ref="youtube" :video-id="question.videoLink" class="test-video">
                      </youtube>
                    </div>
                    <div class="test-add-video-block flex flex-center mt5" v-if="!question.hideVideoBox">
                      <div class="test-add-video-block__modal flex flex-column">
                        <input type="text" class="input test-add-video-block__input" v-model="question.preparateVideoLink" placeholder="Введите ссылку на YouTube видео">
                        <button class="button button_theme-blue test-add-video-block__button" @click.prevent="questionSaveLink(question)">Добавить</button>
                      </div>
                    </div>
                    <!-- Конец блока с видео -->

                    <!-- Блок с изображением -->
                    <input
                      type="file"
                      name="imageQuestion"
                      :ref="'questionInput' + question.id"
                      hidden
                      multiple
                      @change="questionImage($event, question)"
                      v-show="question.images.length === 0"
                    />
                    <div class="test-image mt6" :style="{textAlign: img.align}" v-for="(img, key) in question.images" :key="img.id">
                      <div class="test-image__wraper" tabindex="0">
                        <img :src="img.original_url" :width="img.width" />
                        <div class="image-resizer">
                          <div class="image-resizer__circle image-resizer__circle-left" 
                               style="bottom: -10px; left: -10px"
                               :style="img.align !== 'right' ? 'display:none' : ''"
                               :ref="'imageCircleUp1' + img.id + key"
                               @touchstart="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientHeight, 'left'); currentResizingImage = img"
                               @mousedown="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp1' + img.id + key][0].offsetParent.clientHeight, 'left'); currentResizingImage = img"
                          ></div>
                          <div class="image-resizer__circle" 
                              style="bottom: -10px; right: -10px"
                              :style="img.align === 'right' ? 'display:none' : ''"
                              :ref="'imageCircleUp2' + img.id + key"
                              @touchstart="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientHeight); currentResizingImage = img"
                              @mousedown="RESIZER_imageMouseDown($event, img, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientWidth, $refs['imageCircleUp2' + img.id + key][0].offsetParent.clientHeight); currentResizingImage = img"
                          ></div>
                        </div>
                        <div class="image-menu">
                          <div class="image-menu__inner inline-flex flex-center">
                            <div @click="questionImageAlign(img, 'left')"><AlignLeftSVG /></div>
                            <div @click="questionImageAlign(img, 'center')"><AlignCenterSVG /></div>
                            <div @click="questionImageAlign(img, 'right')"><AlignRightSVG /></div>
                            <div @click="questionImageDelete(question, img, key)"><DeleteSVG /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Конец блока с изображением -->

                    <MultiselectIcons :question="question" />

                    <VariantStandart
                      :postQuestion="question"
                      @postQuestionChecked="question.right_variants = $event"
                      v-if="question.typeAnswer == 'Один из списка' || question.typeAnswer == 'Несколько из списка' || question.typeAnswer == 'Выпадающий список'"
                    />
                    <VariantInput
                      :postQuestion="question"
                      v-if="question.typeAnswer == 'Ввод текста'"
                    />
                    <VariantDate 
                      :postQuestion="question"
                      v-if="question.typeAnswer == 'Дата'"
                    />
                    <VariantTime
                      :postQuestion="question"
                      v-if="question.typeAnswer == 'Время'"
                    />
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="test__block test__item bg-white-shadow">
                  <div
                    class="test__block-inner-div"
                  >
                    <div
                      class="test-question-name mb0"
                    >
                      {{ question.name ? question.name : 'Вопрос' }}
                    </div>
                    <div class="test-image mt6" :style="{textAlign: img.align}" v-for="img in question.images" :key="img.id">
                      <div class="test-image__wraper">
                        <img :src="img.original_url" :width="img.width" />
                      </div>
                    </div>
                    <VariantOneOutput
                      v-if="question.typeAnswer == 'Один из списка'"
                      :postQuestion="question"
                    />
                    <VariantInputOutput
                      v-if="question.typeAnswer == 'Ввод текста'"
                      :postQuestion="question"
                    />
                    <VariantFewOutput
                      v-if="question.typeAnswer == 'Несколько из списка'"
                      :postQuestion="question"
                    />
                    <VariantUnfoldOutput
                      v-if="question.typeAnswer == 'Выпадающий список'"
                      :postQuestion="question"
                    />
                    <VariantDateOutput
                      v-if="question.typeAnswer == 'Дата'"
                    />
                    <VariantTimeOutput
                      v-if="question.typeAnswer == 'Время'"
                    />
                  </div>
                  <div class="test-question-empty" v-if="false">Пустой вопрос</div>
                </div>
              </template>
            </div>
          </draggable>

          <div class="test__block bg-white-shadow mt7 flex" style="min-height:261px" v-if="showAddQuestionLoader">
            <div class="modal modal_white modal-z-medium absolute">
              <Loader />
            </div>
          </div>

          <div class="test__block test__empty bg-white-shadow mt6" v-if="questions.length === 0 && !showAddQuestionLoader">
            Нет вопросов. Добавьте его нажав на кнопку + в панеле слева
          </div>
        </div>
      </div>
    </div>
    <MakeFooter type="test" :link="test.link" @save="saveTest" :showSaveMiniLoader="showSaveMiniLoader" :wasChanged="wasChanged" />
    <InfoModal :message="infoMessage" />
    <SuccessModal 
      v-if="showSuccess" 
      :message="successMessage" 
      :link="test.hash"
      type="test"
      :edit="true"
      @closeModal="showSuccess = false" 
    />
    <div class="modal modal_grey-trasparent" v-if="tips.showTips"></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import Loader from "@/components/Loaders/Loader.vue";

import MultiselectIcons from "@/components/Multiselect/MultiselectIcons";
import { getIdFromUrl } from 'vue-youtube'

import Header from "@/components/Header.vue";

import VariantStandart from "@/components/MakeTest/VariantStandart.vue";
import VariantInput from "@/components/MakeTest/VariantInput.vue";
import VariantInputOutput from "@/components/MakeTest/VariantInputOutput.vue";
import VariantUnfoldOutput from "@/components/MakeTest/VariantUnfoldOutput.vue";
import VariantOneOutput from "@/components/MakeTest/VariantOneOutput.vue";
import VariantFewOutput from "@/components/MakeTest/VariantFewOutput.vue";
import VariantDate from "@/components/MakeTest/VariantDate.vue";
import VariantDateOutput from "@/components/MakeTest/VariantDateOutput.vue";
import VariantTime from "@/components/MakeTest/VariantTime.vue";
import VariantTimeOutput from "@/components/MakeTest/VariantTimeOutput.vue";
import SimpleTip from "@/components/Tips/SimpleTip.vue";

import MakeFooter from "@/components/MakeFooter.vue";
import SuccessModal from "@/components/SuccessModal.vue";

import Settings from "@/components/Settings.vue";

import draggable from 'vuedraggable'
import TipTapEmpty from '@/components/TipTapEmpty.vue';

//SVGs
import AddSVG from '/public/Vectors/add32_new.svg'
import ImageSVG from '/public/pictures/image.svg'
import VideoSVG from '/public/pictures/video.svg'
import DeleteSVG from '/public/pictures/trash-menu.svg'
import AlignLeftSVG from '/public/pictures/align_left.svg'
import AlignCenterSVG from '/public/pictures/align_center.svg'
import AlignRightSVG from '/public/pictures/align_right.svg'

//mobile svg
import AddSVGMobile from '/public/Vectors/mobile-side-panel/add25_new.svg'
import ImageSVGMobile from '/public/Vectors/mobile-side-panel/image27.svg'
import VideoSVGMobile from '/public/Vectors/mobile-side-panel/video25.svg'


import InfoModal from "@/components/InfoModal.vue";

export default {
  name: "MakeTest",
  props: ['hash'],
  data() {
    return {
      questions: [],
      test: {
        id: null,
        name: "",
        description: "",
        link: "",
        hash: "",
        videoLink: "",
      },
      image: {
        data: {},
        link: null,
        isLoading: false
      },
      sidebar: {
        position: 0
      },
      testFocused: true,
      hideVideoBox: true,
      fingerprint: window.VISITOR_ID,
      showSuccess: false,
      successMessage: 'Успешно сохранено',
      videoLoadDone: false,
      imageLoading: false,
      showImagePreloader: false,

      fastSaveTimeoutId: '',
      wasChanged: false,

      settings: {
        test_id: null,
        access_for_all: false,
        password_access: false,
        is_list: true,
        is_right_questions: false,
        is_wrong_questions: false,
        is_resend: false,
        is_reanswer: true,
        has_statistic: true,
        password: '',
        password_confirm: false,
      },
      infoMessage: {},
      currentResizingImage: {},
      isTouchScreen: false,
      showSaveMiniLoader: false,
      showAddQuestionLoader: false,
      tips: {
        showTips: true,
        current: 1,
      }
    };
  },
  components: {
    VariantStandart,
    VariantInput,
    VariantOneOutput,
    VariantInputOutput,
    VariantFewOutput,
    VariantUnfoldOutput, 
    VariantDateOutput, VariantDate,
    VariantTime, VariantTimeOutput,
    draggable,  Header, AddSVG,
    MakeFooter, SuccessModal,
    Loader, InfoModal, MultiselectIcons,
    Settings, DeleteSVG, AlignLeftSVG, AlignCenterSVG,
    AlignRightSVG, AddSVGMobile, ImageSVG,
    ImageSVGMobile, VideoSVG, VideoSVGMobile,
    TipTapEmpty, SimpleTip
  },
  computed: {
  },
  methods: {
    ...mapMutations(["SET_TEST_DRAFT", "CLEAR_TEST_DRAFT"]),

    addQuestion(index) {
      this.showAddQuestionLoader = true
      let name = null;
      let standartVariants = [{ id: 0, name: "Вариант 1", hasDescription: false}]; //Стартовое количество вариантов
      let questionToPost = {
        testId: this.test.id,
        variants: standartVariants,
        name: name,
        index: this.questions.length,
        typeAnswer: "Один из списка",
        isRequire: false,
        right_variants: [],
        videoLink: '',
        hideVideoBox: true
      };

      axios.post("test/question", questionToPost).then((res) => {
        let question = {
          id: res.data,
          name: name || '',
          focused: false,
          typeAnswer: "Один из списка",
          standartVariants: standartVariants,
          index: this.questions.length,
          isRequire: false,
          images: [],
          right_variants: [],
          videoLink: '',
          hideVideoBox: true
        };

        this.showAddQuestionLoader = false,
        this.questions.splice(index + 1, 0, question).join();
        this.questionFocus(question);

        if(index === (this.questions.length - 2)) {
          setTimeout(() => {
            scroll({
              top: document.body.scrollHeight,
              behavior: "smooth"
            });
          }, 50)
        }
      });
    },

    deleteQuestion(key, questionId) {
      this.$delete(this.questions, key);
      this.testFocused = true
      axios.get("test/question/delete/" + questionId).catch(() => {
        this.infoMessage = {body: 'Что-то пошло не так. Попробуйте перезагрузить страницу', type: 'warning'}
      });
    },

    questionFocus(question) {
      this.questions.forEach((element) => {
        if (element.id != question.id) {
          element.focused = false;
        }
      });
      question.focused = true;
      this.testFocused = false
    },

    saveTest(fastSave = false) {
      this.showSaveMiniLoader = true
      let stop = false
      let regexHtml = /<[^<>]+>/g;
      if(this.test.description && this.test.description.replace(regexHtml, "").length > 5000) {
        this.infoMessage = {body: 'Описание не может быть больше 5000 символов' + this.test.description.replace(regexHtml, "").length, type: 'danger'}
        this.wasChanged = false
        stop = true
        return true
      }
      if(this.test.name && this.test.name.length > 300) {
        this.infoMessage = {body: 'Название не может быть больше 300 символов', type: 'danger'}
        this.wasChanged = false
        stop = true
        return true
      }
      this.questions.forEach((question) => {
        if(question.name && (question.name.length > 300)) {
          this.infoMessage = {body: 'Название вопроса не может быть больше 300 символов', type: 'danger'}
          this.wasChanged = false
          stop = true
          return true
        }
        question.standartVariants.forEach((variant) => {
          if(variant.name && (variant.name.length > 1000)) {
            this.infoMessage = {body: 'Вариант не может быть больше 1000 символов', type: 'danger'}
            this.wasChanged = false
            stop = true
            return true
          }
        })
        switch (question.typeAnswer) {
          case "Ввод текста":
            question.selectedVariants = [];
            break;
          default:
            question.selectedVariants = question.standartVariants;
            break;
        }
      });
      let test = {
        questions: this.questions,
        testName: this.test.name || '',
        videoLink: this.test.videoLink || '',
        testDescription: this.test.description,
        testHash: this.test.hash,
        fingerprint: this.fingerprint,
        settings: this.settings
      };
      if(!stop) {
        axios.post("test/save", test).then(() => {
          if(!fastSave) {
            if(this.test.hash == this.$store.state.testStore.draftHash) this.CLEAR_TEST_DRAFT()
            this.successMessage = "Успешно сохранено"
            this.showSuccess = true
          }
          else {
            this.wasChanged = false
          }
        }).catch((error) => {
          switch(error.response.data) {
            case 'Not identified':
              this.$router.replace('/list')
              break;
            default:
              this.infoMessage = {body: 'Что-то пошло не так. Попробуйте перезагрузить страницу', type: 'warning'}
              clearInterval(this.fastSaveTimeoutId)
              break;
          }
        }).finally(() => {
          this.showSaveMiniLoader = false
        });
      }
    },

    uploadImage(event) {
      this.showImagePreloader = true
      this.imageLoading = true
      
      let files = event.target.files
      this.image.data = []
      const fd = new FormData();
      let count = 0
      for (let i in files) {
        if(files[i].size > 5999999) {
          this.infoMessage = {body: 'Файл не должен превышать 5мб', type: 'danger'}
          continue
        }
        if (Object.prototype.hasOwnProperty.call(files,i)) {
          fd.append(`testImage${count}`, files[i])
          fd.append(`imageType${count}`, files[i].type.split('/')[1])
          count++
        }
      }
      
      fd.append('countImages', count)
      fd.append("testHash", this.test.hash)
      
      if (!this.image.data) return;
      
      axios.post("test/upload", fd).then((res) => {
        let images = res.data.data.imageLink
        for(let key in images) {
          this.$set(this.image.data, key, images[key])
        }
        this.imageLoading = false
      })
      .catch(() => {
        this.showImagePreloader = false
        this.infoMessage = {body: 'Не удалось загрузить изображения. Попробуйте позже', type: 'danger'}
      });
      event.target.value = '';
    },

    deleteImage(image, key) {
      if(image.id) {
        axios.post("test/upload/delete", { testHash: this.test.hash, id: image.id }).then(() => {
          this.$delete(this.image.data, key);
          if(this.image.data.length === 0) this.showImagePreloader = false
        });
      }
      else {
        this.image.data.splice(key, 1)
      }
    },

    clickQuestionImage(id) {
      this.$refs['questionInput' + id][0].click()
    },
    clickQuestionVideo(question) {
      if(!question.videoLink) {
        question.hideVideoBox = !question.hideVideoBox
      }
    },
    questionSaveLink(question) {
      question.videoLink = getIdFromUrl(question.preparateVideoLink)
      question.hideVideoBox = true
    },
    questionDeleteVideo(question) {
      question.videoLink = null
    },
    questionImage(event, question) {
      let files = event.target.files
      const fd = new FormData();
      let count = 0
      for (let i in files) {
        if(files[i].size > 5999999) {
          this.infoMessage = {body: 'Файл не должен превышать 5мб', type: 'danger'}
          continue
        }
        if (Object.prototype.hasOwnProperty.call(files,i)) {
          fd.append(`questionImage${count}`, files[i])
          fd.append(`imageType${count}`, files[i].type.split('/')[1])
          count++
        }
      }
      
      fd.append('countImages', count)
      fd.append("testHash", this.test.hash)
      fd.append("id", question.id);

      axios.post("test/question/upload", fd).then((res) => {
        let images = res.data.data.images
        for(let key in images) {
          this.$set(question.images, key, images[key])
        }
      }).catch(() => {
        this.infoMessage = {body: 'Не удалось загрузить изображения. Попробуйте позже', type: 'danger'}
      });
    },

    questionImageDelete(question, image, key) {
      if(image.id) {
        axios.post("test/upload/delete", { testHash: this.test.hash, id: image.id }).then(() => {
          this.$delete(question.images, key);
        });
      }
    },
    dragEnd() {
      this.questions.forEach((question, index) => {
        question.index = index;
      })
    },
    saveLink() {
      this.test.videoLink = getIdFromUrl(this.$refs.linkInput.value)
      this.hideVideoBox = true
    },
    deleteVideo() {
      this.test.videoLink = null
    },
    //Mounted methods
    getTest(hash) {
      this.showImagePreloader = true
      this.imageLoading = true
      axios.post("test/", {hash: hash, fingerprint: this.fingerprint}).then((res) => {
        if(!res) {
          this.$router.push('/test/create')
        }
        this.getTestQuestions()
        
        res = res.data.data;
        this.settings = res.settings[0]

        this.test.id = res.id
        this.test.name = res.testName || '';
        this.test.videoLink = res.videoLink;
        this.test.description = res.description || '';
        this.test.link = "https://skyber.ru/tests/" + res.hash;
        
        for(let key in res.imageLink) {
          this.$set(this.image.data, key, res.imageLink[key])
        }
        
        this.imageLoading = false
        if(res.imageLink.length === 0) this.showImagePreloader = false
      }).catch((error) => {
        let hashStore = this.$store.state.testStore.draftHash
        if(hashStore != null && hash == hashStore) {
          this.CLEAR_TEST_DRAFT()
        }
        switch(error.response.data) {
          case 'Not identified':
            this.$router.replace('/list')
            break;
          case 'Not Found':
            this.$router.push('/test/create')
            break;
          default:
            this.infoMessage = {body: 'Что-то пошло не так. Попробуйте зайти позже', type: 'warning'}
            break;
        }
      })
    },
    getTestQuestions() {
      axios
        .post("test/questions/", {hash: this.test.hash, fingerprint: this.fingerprint })
        .then((res) => {
          res.data.data.forEach((element) => {
            let selectedVariants = JSON.parse(element.variants);
            let standartVariants = [{ id: 0, name: "Вариант 1", hasDescription: false}];

            if (element.typeAnswer == "Ввод текста") {
              //
            } else {
              selectedVariants == null ? selectedVariants = [] : ''
              selectedVariants = selectedVariants.filter((elem) => {
                return elem.name !== null;
              });

              standartVariants = selectedVariants;
            }
            let images = []
            for(let key in element.images) {
              images[key] = element.images[key]
            }
            this.questions.push({
              id: element.id,
              name: element.question,
              focused: false,
              standartVariants: standartVariants,
              typeAnswer: element.typeAnswer,
              index: element.index,
              isRequire: element.isRequire,
              images: images,
              right_variants: element.right_variants,
              videoLink: element.videoLink,
              hideVideoBox: element.videoLink !== null ? false : true
            });
          });
          this.$store.commit('HIDE_LOADER')
        })
        .catch((error) => {
          switch(error.response.data) {
            case 'Not identified':
              this.$router.replace('/list')
              break;
            default:
              this.infoMessage = {body: 'Что-то пошло не так. Попробуйте перезагрузить страницу', type: 'warning'}
              break;
          }
        });
    },
    
    clickImage() {
      this.$refs.imageInput.click();
    },

    testFocuse() {
      let questionsKeys = Object.keys(this.questions)
      questionsKeys.forEach((key) => {
        this.questions[key].focused = false
      })
      this.testFocused = true;
    },

    copyQuestion(question) {
      let name = question.name;
      let standartVariants = question.standartVariants; //Стартовое количество вариантов
      let questionToPost = {
        testId: this.test.id,
        name: name || '',
        focused: false,
        typeAnswer: question.typeAnswer,
        standartVariants: standartVariants,
        index: this.questions.length,
        isRequire: question.isRequire,
        images: question.images,
        right_variants: question.right_variants,
        videoLink: question.videoLink,
        hideVideoBox: true
      };

      axios.post("test/question", questionToPost).then((res) => {
        questionToPost.id = res.data

        this.questions.push(questionToPost);
        this.questionFocus(questionToPost);
      });
    },
    imageAlign(image, direction) {
      image.align = direction
      axios.post('/test/image/alignment', {align: direction, media_id: image.id}).then(() => {
        
      })
    },
    questionImageAlign(image, direction) {
      image.align = direction
      axios.post('/test/image/alignment', {
        align: direction,
        media_id: image.id
      }).catch(() => {
        this.infoMessage = {body: 'Что-то пошло не так. Попробуйте позже', type: 'warning'}
      })
    },
    RESIZER_imageMouseUp(event, img) {
      if(img.activateOver) {
        img.activateOver = false
        axios.post('/test/image/size', img).catch(() => {
          this.infoMessage = {body: 'Что-то пошло не так. Попробуйте позже', type: 'warning'}
        })
      }
    },
    isTouchScreenMethod() {
      return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
    },
  },

  watch: {
    test: {
      deep: true,
      handler() {
        this.wasChanged = true
      }
    },
    questions: {
      deep: true,
      handler() {
        this.wasChanged = true
      }
    },
    settings: {
      deep: true,
      handler() {
        this.wasChanged = true
      }
    }
  },

  mounted() {
    this.test.hash = this.hash
    this.$store.commit('SHOW_LOADER')
    if (this.test.hash && this.test.hash !== '') {
      this.getTest(this.test.hash);
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

    let th = this
    this.fastSaveTimeoutId = setInterval(() => {
      if(th.wasChanged) th.saveTest(true)
    }, 3500)

    this.isTouchScreen = this.isTouchScreenMethod()

    let showTips = this.$cookie.get('showTips');
    if(showTips !== null) {
      this.tips.current = 0
      this.tips.showTips = (this.$cookie.get('showTips') === 'true')
    }
    else {
      this.tips.showTips = true
    }
  },

  destroyed(){
    clearInterval(this.fastSaveTimeoutId)
  },
  metaInfo() {
    return { 
        title: "Создание теста | Skyber",
        meta: [
            { name: 'description', content:  'Создавайте тесты и получайте мгновенные ссылки на них, делитесь с кем угодно и собирайте статистику по каждому вопросу!'},
            { property: 'og:title', content: "Создание теста | Skyber"},
            { property: 'og:site_name', content: 'Skyber'},
            { property: 'og:type', content: 'website'},    
            { name: 'robots', content: 'noindex,nofollow'} 
        ]
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/common.blocks/body/_themes/body_themes-light.scss';
@import "@/common.blocks/index.scss";
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-radio_type-main.scss";
@import "@/common.blocks/custom-multiselect.scss";
@import "@/common.blocks/tiptap.scss";

</style>
