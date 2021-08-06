<template>
  <div class="slide-up" v-if="windowTop > 700" @click="scrollUp">
    <div class="slide-up__text flex flex-center">Наверх <UpSVG /></div>
  </div>
</template>

<script>
import UpSVG from '/public/pictures/up.svg'

export default {
  name: 'SlideUp',
  data() {
    return {
      windowTop: 0,
    }
  },
  components: {
    UpSVG
  },
  methods: {
    onScroll() {
      this.windowTop = window.top.scrollY /* or: e.target.documentElement.scrollTop */
    },
    scrollUp() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
}

</script>

<style lang="scss" scoped>
.slide-up {
  width: 120px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #eceaea81;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;

  &__text {
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    color: #b8b8b8;
    font-weight: bold;
    margin-bottom: 100px;

    > svg {
      display: none;
      margin-left: 7px;
    }
  }
}

.slide-up:hover {
  background-color: #dfdfdf81;
}

@media (max-width: 1130px) {
  .slide-up {
    width: 160px;
    height: 40px;
    top: 90px;
    border-radius: 5px;
    left: calc(50% - 80px);
    background-color: #6669fb;
    align-items: center;
    z-index: 100;
  }

  .slide-up:hover {
    background-color: #6669fb;
  }

  .slide-up__text {
    color: white;
    margin-bottom: 0;
    > svg {
      display: block;
    }
  }
}

@media (max-width: 540px) {
  .slide-up {
    top: 70px;
  }
}
</style>
