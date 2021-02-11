<template>
  <div>
    <div v-for="question in postQuestions" :key="question.id">
      <span>{{ question.question }}: </span><br />
      <div v-if="question.typeAnswer == 'Один из списка' || question.typeAnswer == 'Разворачивающийся список'">
        <div v-for="variant in question.variants" :key="variant.id">
          <span>{{ variant.name }}: {{ variant.percent }}%</span>
        </div>
      </div>

      <div v-if="question.typeAnswer == 'Ввод текста' || question.typeAnswer == 'Несколько из списка'">
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
  components: {},
  methods: {},
};
</script>
