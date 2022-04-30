<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Vue NFT Market" />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <LinkComponent v-model="current" :name="'Explore'" :page="'/'" />
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <LinkComponent v-model="current" :name="'New Asset'" :page="'/createAsset'"  />
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex">
          <LinkComponent v-model="current" :name="'Explore'" :page="'/'" />
          <LinkComponent v-model="current" :name="'New Asset'" :page="'/createAsset'" />
        </div>
      </DisclosurePanel>
    </Disclosure>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import LinkComponent from '@/components/LinkComponent.vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'

export default {
  components: {
    LinkComponent,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MenuIcon,
    XIcon,
  },
  setup() {
    const router = useRouter()
    const current = ref('/')
    return {
      current,
    }
  },
}
</script>