<template>
  <div></div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["SET_TEST_DRAFT", "CLEAR_TEST_DRAFT"]),
  },
  mounted() {
    this.$store.commit('SHOW_LOADER')
    if(this.$store.state.testStore.draftHash != null) {
      this.$router.push('/test/edit/' + this.$store.state.testStore.draftHash)
    }
    else {
      axios
        .post("test/create", {fingerprint: window.VISITOR_ID})
        .then((res) => {
          this.SET_TEST_DRAFT(res.data.data.hash)
          this.$store.commit('HIDE_LOADER')
          this.$router.push({ name: "MakeTest", params: {hash: res.data.data.hash} });
        })
        .catch(() => {
          this.$router.push({ name: "Home" });
        })
    }
  }
}
</script>
