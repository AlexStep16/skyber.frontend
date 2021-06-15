<template>
  <multiselect
    :allow-empty="false"
    :multiple="false"
    :value="typeVariants"
    :options="options"
    selectLabel=""
    selectedLabel=""
    :searchable="false"
    deselectLabel=""
    :placeholder="'Выберите тип ответа'"
    class="mt5"
    @select="$emit('selected', $event)"
  >
    <template slot="singleLabel" slot-scope="props">
      <div class="option__image">
        <RadioSVG v-if="props.option === 'Один из списка'" />
        <CheckboxSVG v-if="props.option === 'Несколько из списка'" />
      </div>
      <span class="option__desc">
        <span class="option__title">{{ props.option }}</span>
      </span>
    </template>
    <template slot="option" slot-scope="props">
      <div class="option__image">
        <RadioSVG v-if="props.option === 'Один из списка'" />
        <CheckboxSVG v-if="props.option === 'Несколько из списка'" />
      </div>
      <div class="option__desc">
        <span class="option__title">{{ props.option }}</span>
      </div>
    </template>  
  </multiselect>
</template>

<script>
import Multiselect from "vue-multiselect";
import RadioSVG from '../../../public/Vectors/radio.svg'
import CheckboxSVG from '../../../public/Vectors/checkbox.svg'


export default {
  name: 'MultiselectIconsPoll',
  props: ['typeVariants'],
  data() {
    return {
      options: ["Один из списка", "Несколько из списка"],
    }
  },
  components: {
    Multiselect, RadioSVG,
    CheckboxSVG
  },
}

</script>
