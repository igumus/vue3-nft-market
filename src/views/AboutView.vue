<template>
  <BasicComponent title="This is an about page" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasicComponent from '@/components/BasicComponent.vue';

export default defineComponent({
  name: 'AboutView',
  components: { BasicComponent },
});

</script>
