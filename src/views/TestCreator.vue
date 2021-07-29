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
    let draftHash = this.$store.state.testStore.draftHash;
    if(draftHash != null && draftHash != "") {
      this.$router.replace('/test/edit/' + this.$store.state.testStore.draftHash)
    }
    else {
      axios
        .post("test/create", {fingerprint: window.VISITOR_ID})
        .then((res) => {
          this.SET_TEST_DRAFT(res.data.data.hash)
          this.$store.commit('HIDE_LOADER')
          this.$router.replace({ name: "MakeTest", params: {hash: res.data.data.hash} });
        })
        .catch((er) => {
          alert(er)
          this.$router.replace({ name: "Home" });
        })
    }
  }
}
</script>
