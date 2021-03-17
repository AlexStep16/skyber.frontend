<template>
    <date-picker
      type="time"
      v-model="time1" 
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
  name: 'VariantDate',
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
