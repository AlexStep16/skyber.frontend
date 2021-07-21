<template>
    <date-picker 
      v-model="time1" 
      valueType="format"
      placeholder="Выберите дату"
      class="mt6"
    >
    </date-picker>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

export default {
  name: 'VariantDateOutput',
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
