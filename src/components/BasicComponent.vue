<template>
  <div>
    <img class="mx-auto" alt="Vue logo" src="../assets/logo.png" />
    <h1 class="font-bold text-3xl underline">{{title}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BasicComponent',
  props: {
    title: {type: String, default: 'DefaultValue'}
  }
})
</script>


<style></style>