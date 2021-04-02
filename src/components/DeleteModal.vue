<template>
  <div class="modal modal_black flex flex-center">
    <div class="modal-container">
      <div class="modal-confirm-block flex flex-vertical flex-align-center">
        <h2 class="modal-confirm-block__message">{{ message }}</h2>
        <div class="mt5">
          <button class="button-clasic button_theme-red button_theme-red_shadow mr7" @click="$emit('action', 1)">
            {{ redMessage }}
          </button>
          <button class="button-clasic button_theme-blue button_theme-blue_shadow" @click="$emit('action', 0)">
            {{ blueMessage }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'DeleteModal',
  props: ["message", "redMessage", "blueMessage"],
  data() {
    return {};
  },
  components: {
    
  },
  methods: {
    
  }
}

</script>

<style lang="sass" scoped>
@import "@/common.blocks/index.scss";
</style>
