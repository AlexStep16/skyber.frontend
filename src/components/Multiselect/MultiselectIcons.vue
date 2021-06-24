<template>
  <multiselect
    :allow-empty="false"
    :multiple="false"
    v-model="question.typeAnswer"
    :options="options"
    selectLabel=""
    selectedLabel=""
    :option-height="170"
    :searchable="false"
    deselectLabel=""
    :placeholder="'Выберите тип ответа'"
    class="mt5 mb5"
    @select="clearRights(question)"
  >
    <template slot="singleLabel" slot-scope="props">
      <div class="option__image">
        <RadioSVG v-if="props.option === 'Один из списка'" />
        <CheckboxSVG v-if="props.option === 'Несколько из списка'" />
        <DateSVG v-if="props.option === 'Дата'" />
        <ClockSVG v-if="props.option === 'Время'" />
        <ListSVG v-if="props.option === 'Выпадающий список'" />
        <span v-if="props.option === 'Ввод текста'" class="option__text">Text</span>
      </div>
      <span class="option__desc">
        <span class="option__title">{{ props.option }}</span>
      </span>
    </template>
    <template slot="option" slot-scope="props">
      <div class="option__image">
        <RadioSVG v-if="props.option === 'Один из списка'" />
        <CheckboxSVG v-if="props.option === 'Несколько из списка'" />
        <DateSVG v-if="props.option === 'Дата'" />
        <ClockSVG v-if="props.option === 'Время'" />
        <ListSVG v-if="props.option === 'Выпадающий список'" />
        <span v-if="props.option === 'Ввод текста'" class="option__text">Text</span>
      </div>
      <div class="option__desc">
        <span class="option__title">{{ props.option }}</span>
      </div>
    </template>  
  </multiselect>
</template>

<script>
import Multiselect from "vue-multiselect";
import RadioSVG from '/public/Vectors/radio.svg'
import CheckboxSVG from '/public/Vectors/checkbox.svg'
import DateSVG from '/public/Vectors/date.svg'
import ClockSVG from '/public/Vectors/clock.svg'
import ListSVG from '/public/Vectors/list.svg'


export default {
  name: 'MultiselectIcons',
  props: ['question'],
  data() {
    return {
      options: ["Один из списка", "Ввод текста", "Несколько из списка", "Выпадающий список", "Дата", "Время"],
    }
  },
  components: {
    Multiselect, RadioSVG,
    CheckboxSVG, DateSVG, ClockSVG,
    ListSVG
  },
  methods: {
    clearRights(question) {
      question.right_variants = []
    },
  }
}

</script>
