<template>
  <BasicComponent title="This is home page" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasicComponent from '@/components/BasicComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    BasicComponent
  }
});
</script>
