<template>
    <date-picker
      v-model="postQuestion.checked" 
      valueType="format"
      placeholder="Выберите дату"
    >
    </date-picker>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

export default {
  name: 'VariantDateOutput',
  props: ["postQuestion"],
  components: {
    DatePicker
  },
  data() {
    return {
      //
    }
  },
  methods: {
    
  }
}

</script>
