<template>
  <div class="container flex flex-justify-center">
    <Header type="test" />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Scenario",
  data() {
    return {

    }
  },
  components: {
    Header,
  },
  methods: {

  },
  mounted() {
    //
  }
};
</script>
