<template>
  <div class="loader-wrapper flex flex-center">
    <div class="loader"></div>
  </div>
</template>

<script>


export default {
  name: 'TestList',
  components: {
    
  },
  methods: {
    
  }
}

</script>

<style lang="scss" scoped>
.loader-wrapper {
  width: 100%;
  height: 100%;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 5px solid #eeeded;
  border-right: 5px solid #eeeded;
  border-bottom: 5px solid #eeeded;
  border-left: 5px solid #6769fc;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
