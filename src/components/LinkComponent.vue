<template>
    <router-link :to="linkPage" @click="onClicked()" :class="[isActive() ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="isActive() ? 'page' : undefined">
        <span>{{linkName}}</span> 
    </router-link> 
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';
export default defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
            required: true
        },  
        page: {
            type: String as PropType<string>,
            required: true
        },
        modelValue: {
            type: String as PropType<string>,
            required: true
        },
    },
    setup(props: any, context:any) {
        const linkName = ref(props.name)
        const linkPage = ref(props.page)

       const isActive = () => {
           return props.page === props.modelValue
       } 
       const onClicked = () => {
           context.emit('update:modelValue', props.page)
       }
       return {
        linkName,
        linkPage,
        isActive,
        onClicked,
       }
    }});
</script>
