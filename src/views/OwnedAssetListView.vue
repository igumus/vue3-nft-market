<template>
  <div class="flex justify-center">
    <div v-if="items.length" class="px-4 max-w-7xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <NFTCard v-for="(nft, idx) in items" :key="idx" :item="nft"/>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mr-4">
            <span class="block">You don't own any items, Ready to buy one ?</span>
          </h2>
          <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div class="ml-3 inline-flex rounded-md shadow">
              <router-link to="/explore" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">Explore</router-link>
            </div>
          </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from 'vue';
import { MarketItem, myItems } from '@/market'
import NFTCard from '@/components/NFTCard.vue'

export default defineComponent({
  name: 'OwnedAssetListView',
  components: { NFTCard },
  setup() {
    const items = ref<MarketItem[]>([])

    onMounted(async () => {
      items.value = await myItems()
      console.log('items fetched')
      items.value.forEach(e => console.log(e.owner))
      console.log('owned items: ', items.value.length)
    })

    return { items }
  }



});
</script>
