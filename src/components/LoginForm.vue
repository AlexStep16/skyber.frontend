<template>
  <form action="api/login" class="form form_type-main">
    <input type="text" name="email" id="email" class="input input_type-main pt4"><br>
    <input type="text" name="email" id="email" class="input input_type-main">
  </form>
</template>

<script>
export default {
  name: 'LoginForm'
}
</script>

<style scoped lang="scss">
@import '@/common.blocks/input/_type/input_type-main.scss';
@import '@/common.blocks/form/_type/form_type-main.scss';
  
</style>
