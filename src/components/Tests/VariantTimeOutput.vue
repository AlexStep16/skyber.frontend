<template>
    <date-picker
      type="time"
      v-model="postQuestion.checked" 
      valueType="format"
      placeholder="Выберите время"
      format="HH:mm"
      value-type="HH:mm"
    >
    </date-picker>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

export default {
  name: 'VariantTimeOutput',
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
