<template>
  <div>
    <div v-for="(answer, key) in postPollAnswers" :key="key">
      <span>
        {{ answer.answer }} -
        {{ ((answer.count / postCountPollAnswers) * 100).toFixed(1) }}%
      </span>
    </div>
  </div>
</template>

<script>
//import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "PollStatOutput",
  props: ["postPollAnswers", "postCountPollAnswers"],
  data() {
    return {
      pollAnswers: null
    }
  },
  components: {},
  methods: {},
};
</script>
