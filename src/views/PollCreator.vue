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
    if(this.$store.state.pollStore.draftHash != null) {
      this.$router.push('/poll/edit/' + this.$store.state.pollStore.draftHash)
    }
    else {
      axios
        .post("poll/create", {fingerprint: window.VISITOR_ID})
        .then((res) => {
          this.SET_POLL_DRAFT(res.data.data.hash)
          this.$store.commit('HIDE_LOADER')
          this.$router.push({ name: "MakePoll", params: {hash: res.data.data.hash} });
        })
        .catch(() => {
          this.$router.push({ name: "Home" });
        })
    }
  }
}
</script>
