<template>
    <div class="border shadow rounded-xl overflow-hidden">
        <img v-if="item.link" :src="item.link" class="h-52"/>
        <div class="p-4">
            <p class="text-2xl font-semibold">{{item.name}}</p>
            <p class="text-gray-400">{{item.desc}}</p>
            <p class="text-gray-400">{{seller}}</p>
            <!-- <div class="overflow-hidden h-20"></div> -->
        </div>
        <div class="p-4 bg-black">
            <p class="text-2xl mb-4 font-bold text-white">{{item.price}} ETH</p>
            <button v-if="buyable" class="w-full bg-indigo-500 text-white font-bold py-2 px-12 rounded" @click="buy()">{{owned ? "Resell" : "Buy"}}</button>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import {MarketItem, buyNFT, resellNFT} from '@/market'

export default defineComponent({
    name: "NFTCard",
    props: {
        buyable: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        owned: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        item: {
            type: Object as PropType<MarketItem>,
            required: true
        },
    },
    setup(props) {

       const buy = async() => {
           if (props.owned) {
               await resellNFT(props.item)
           } else {
                await buyNFT(props.item)
           }
       }

       const seller = computed(() => {
           return props.item.seller.substring(0, 10)
       })

       return {
           seller,
           buy
       }
    },
})
</script>
