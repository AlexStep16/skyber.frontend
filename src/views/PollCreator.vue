<template>
  <div></div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["SET_POLL_DRAFT", "CLEAR_POLL_DRAFT"]),
  },
  mounted() {
    this.$store.commit('SHOW_LOADER')
    let draftHash = this.$store.state.pollStore.draftHash
    if(draftHash != null && draftHash != "") {
      this.$router.replace('/poll/edit/' + this.$store.state.pollStore.draftHash)
    }
    else {
      axios
        .post("poll/create", {fingerprint: window.VISITOR_ID})
        .then((res) => {
          this.SET_POLL_DRAFT(res.data.data.hash)
          this.$store.commit('HIDE_LOADER')
          this.$router.replace({ name: "MakePoll", params: {hash: res.data.data.hash} });
        })
        .catch(() => {
          this.$router.replace({ name: "Home" });
        })
    }
  }
}
</script>
