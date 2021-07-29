<template>
  <div style="width: 100%">
    <date-picker 
      v-model="time1" 
      valueType="format"
      placeholder="Выберите дату"
    >
    </date-picker>
    <div class="test-require mt6 flex flex-align-center">
      <label class="slider">
        <input type="checkbox" v-model="postQuestion.isRequire">
        <span class="slider__circle slider__round"></span>
      </label>
      <span class="test-require__text ml5">Обязательный вопрос</span>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

export default {
  name: 'VariantDate',
  props:['postQuestion'],
  components: {
    DatePicker
  },
  data() {
    return {
      time1: ''
    }
  },
  methods: {
    
  }
}

</script>

<style lang="scss" scoped>
@import "@/common.blocks/maketest.scss";
@import "@/common.blocks/form-slider_type-main.scss";
</style>
