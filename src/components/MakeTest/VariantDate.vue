<template>
  <div style="width: 100%">
    <date-picker 
      v-model="time1" 
      valueType="format"
      placeholder="Выберите дату"
    >
    </date-picker>
  </div>
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
