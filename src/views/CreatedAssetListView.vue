<template>
  <div class="flex justify-center">
    <div v-if="items.length" class="px-4 max-w-7xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <NFTCard v-for="(nft, idx) in items" :key="idx" :item="nft"/>
      </div>
    </div>
    <div v-else>
      <h1 className="py-10 px-20 text-3xl">No NFTs Created</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from 'vue';
import { createdAssets, MarketItem, myItems } from '@/market'
import NFTCard from '@/components/NFTCard.vue'

export default defineComponent({
  name: 'CreatedAssetListView',
  components: { NFTCard },
  setup() {
    const items = ref<MarketItem[]>([])

    onMounted(async () => {
      items.value = await createdAssets()
    })

    return { items }
  }



});
</script>
