<template>
    <div class="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12">
            <input 
                v-model="name"
                type="text"
                placeholder="Asset Name"
                className="mt-8 border rounded p-4"
            />
            <span v-if="nameErr" class="px-2 text-red-400 font-thin">{{nameErr}}</span>
            
            <textarea
                v-model="desc"
                placeholder="Asset Description"
                className="mt-2 border rounded p-4"
            />
            
            <input
                v-model.number="price"
                type="text"
                placeholder="Asset Price in Eth"
                className="mt-2 border rounded p-4"
            />
            <span v-if="priceErr" class="px-2 text-red-400 font-thin">{{priceErr}}</span>
            
            <input
                type="file"
                @change="onFilePicked"
            />
            <span v-if="fileErr" class="px-2 text-red-400 font-thin">{{fileErr}}</span>

            <button @click="createMarket" className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                Create Digital Asset
            </button>
      </div>
    </div>
</template>

<script lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { uploadAsset, uploadMetaData, pushToMarket } from '@/market'

export default {
    name: 'CreateAssetView',
    setup() {
        const router = useRouter()
        const name = ref('') 
        const nameErr = ref('')
        const desc = ref('')
        const price = ref(0)
        const priceErr = ref('')
        const fileErr = ref('')
        const fileUrl = ref('')


        const hasError = (): boolean => {
            return (nameErr.value !== '' ||  priceErr.value !== ''|| fileErr.value !== '')
        }

        const validateForm = () => {
            nameErr.value = (!name.value ? 'Asset Name should be given' : '')
            priceErr.value = (price.value > 0 ? '' : 'Asset Price should be more than zero')
            fileErr.value = (!fileUrl.value ? 'Asset File should be given': '')
        }

        const onFilePicked = async (event: Event) => {
            const inputElement = event.target as HTMLInputElement
            console.log("selected files size: ", inputElement.files?.length)
            if (inputElement && inputElement.files && inputElement.files?.length > 0) {
               const file = inputElement.files[0]
               const url = await uploadAsset(file)
               if (url) {
                   fileUrl.value = url
                   fileErr.value = ''
               } else {
                   fileUrl.value = ''
                   fileErr.value = 'Uploading asset failed'
               }
            }
        }
        
        const createMarket = async () => {
            validateForm()
            if (hasError()) {
                return
            } else {
                const metaUrl = await uploadMetaData(name.value, desc.value, fileUrl.value);
                console.log('uploaded metadata url: ', metaUrl)
                if (metaUrl) {
                    let ok = await pushToMarket(metaUrl, price.value)
                    if (ok) {
                        router.push('/')
                    }
                } else {
                    console.error('failed to upload asset')
                }
            }
        }

        return {
            name,
            nameErr,
            desc,
            price,
            priceErr,
            fileUrl,
            fileErr,
            onFilePicked,
            createMarket,
        }
    }
}
</script>

<style></style>
