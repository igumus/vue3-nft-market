<template>
  <div class="flex justify-center">
   <div class="px-4 max-w-7xl">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <NFTCard v-for="(nft, idx) in items" :key="idx" :item="nft"/>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from 'vue';
import { listMarketItems, MarketItem } from '@/market'
import NFTCard from '@/components/NFTCard.vue'

export default defineComponent({
  name: 'HomeView',
  components: { NFTCard },
  setup() {
    const items = ref<MarketItem[]>()
  
   onMounted(async () => {
     items.value = await listMarketItems()
     items.value.forEach((e, idx) => console.log(`item-${idx}`, e.desc))
   })
    
  return { items }
  }



});
</script>
