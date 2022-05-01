<template>
    <div class="border shadow rounded-xl overflow-hidden">
        <img v-if="nft.link" :src="nft.link" class="h-52"/>
        <div class="p-4">
            <p class="h-16 text-2xl font-semibold">{{nft.name}}</p>
            <div class="overflow-hidden h-20">
                <p class="text-gray-400">{{nft.desc}}</p>
            </div>
        </div>
        <div class="p-4 bg-black">
            <p class="text-2xl mb-4 font-bold text-white">{{nft.price}} ETH</p>
            <button class="w-full bg-indigo-500 text-white font-bold py-2 px-12 rounded" @click="buy(nft)">Buy</button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {MarketItem, buyNFT} from '@/market'

export default defineComponent({
    name: "NFTCard",
    props: {
        item: Object 
    },
    setup(props) {
       const nft = ref<MarketItem>()
       nft.value = props.item as MarketItem

       const buy = async(e: MarketItem) => {
           await buyNFT(e)
           console.log('about to buy nft: ', e.itemId)
       }

       return {
           nft,
           buy
       }
    },
})
</script>
