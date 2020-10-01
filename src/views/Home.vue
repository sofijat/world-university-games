<template>
  <div class="mb-5">
    <img alt="Univerzijada logo" src="../assets/Logo.png">
    <HelloWorld msg="Dobrodošli"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
  .aaa {
    padding-bottom: 50px;
  }
</style>
