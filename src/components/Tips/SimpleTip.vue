<template>
  <div class="tip z-index4" v-if="tips.showTips">
    <div class="tip-body">
      <div class="tip-header"><b>{{ tipsTranslator[tips.current].header }}</b></div>
      <div class="tip-description mt5">{{ tipsTranslator[tips.current].description }}</div>
    </div>
    <div class="tip-footer flex">
      <div class="tip-footer__skip" @click="skip">Пропустить</div>
      <div class="tip-footer__counter">{{ tips.current }} из 6</div>
      <div class="tip-footer__next" @click="nextTip"><b>Дальше</b></div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'SimpleTip',
  props: {
    tips: {
      type: Object,
    }
  },
  data() {
    return {
      tipsTranslator: {
        1: {
          header: 'Создание теста',
          description: 'Добро пожаловать! Ваш тест уже создан, но лучше заполнить важную информацию. Для описания теста можно воспользоваться встроенным редактором (просто выделите текст)',
        },
        2: {
          header: 'Добавление вопросов',
          description: 'Тест не будет работать без вопросов. Чтобы добавить их нажмите на кнопку плюса',
        },
        3: {
          header: 'Добавление изображений',
          description: 'Вы также можете добавить изображения к текущему активному окну (для смены нажмите на другое окно)',
        },
        4: {
          header: 'Добавление видео',
          description: 'В тесте можно использовать видео. Для добавления вам нужна ссылка с YouTube',
        },
        5: {
          header: 'Настройки теста',
          description: 'Настройки теста позволят добавить сценарии, изменить доступ, сбор статистики, показ правильных ответов, а также многое другое.',
        },
        6: {
          header: 'Создание сценария',
          description: 'Вы можете отредактировать то, что увидит пользователь после того как отправит тест. Это называется сценарием.',
        },
      }
    }
  },
  components: {
    
  },
  methods: {
    nextTip() {
      if(this.tips.current < 6) this.tips.current++
      else {
        this.tips.current = 0
        this.tips.showTips = false
        let date = new Date;
        date.setDate(date.getDate() + 1000);
        this.$cookie.set('showTips', 'false', {expires: date})
      }
    },

    skip() {
      this.tips.current = 0
      this.tips.showTips = false
      let date = new Date;
      date.setDate(date.getDate() + 1000);
      this.$cookie.set('showTips', 'false', {expires: date})
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/tips.scss";
</style>
