<template>
  <div class="flex justify-center">
   <div class="px-4 max-w-7xl">
        <div v-if="items" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <NFTCard v-for="(nft, idx) in items" :key="idx" :item="nft"/>
        </div>
        <div v-else>
          <h1 className="py-10 px-20 text-3xl">No NFTs in market</h1>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from 'vue';
import { listMarketItems, MarketItem } from '@/market'
import NFTCard from '@/components/NFTCard.vue'

export default defineComponent({
  name: 'ExploreView',
  components: { NFTCard },
  setup() {
    const items = ref<MarketItem[]>()

    onMounted(async () => {
      items.value = await listMarketItems()
    })

    return { items }
  }



});
</script>
