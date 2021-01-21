<template>
  <div>
    <div v-for="question in postQuestions" :key="question.id">
      <span>{{ question.question }}: </span><br />
      <div v-if="question.typeAnswer == 'Один из списка'">
        <div v-for="variant in question.variants" :key="variant.id">
          <span>{{ variant.name }}: {{ variant.percent }}%</span>
        </div>
      </div>

      <div v-if="question.typeAnswer == 'Ввод текста'">
        <div v-for="(answer, key) in question.answers" :key="key">
          <span>{{ answer.name }} - {{ answer.count }}</span>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>

export default {
  name: "TestStatOutput",
  props: ["postQuestions"],
  data() {
    return {
      questions: null
    }
  },
  components: {},
  methods: {},
};
</script>
