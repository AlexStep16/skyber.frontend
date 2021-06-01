<template>
  <div class="link-closed bg-white-border flex flex-center">
    <h4 class="link-closed__h4"><ClosedSVG class="mr5" /> Доступ к тесту по ссылке закрыт</h4>
  </div>
</template>

<script>
import ClosedSVG from '../../public/pictures/closed.svg'

export default {
  name: 'LinkClosed',
  props: ['type'],
  components: {
    ClosedSVG
  },
  methods: {
    
  }
}

</script>

<style lang="scss" scoped>
.link-closed {
  width: 700px;
  height: 200px;

  &__h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    color: #444;
    display: flex;
    align-items: center;
  }
}
</style>
