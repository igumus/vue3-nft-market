<template>
  <div class="text-gray-600 font-body h-screen">
    <nav class="flex justify-between">
     <div>
       <h1>
         <router-link to="/">NFT Market</router-link> 
       </h1>
     </div>
     <ul class="flex justify-end">
       <li>
         <router-link to="/" class="flex">
          <svg class="w-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Home</span>
         </router-link> 
       </li>
       <li>
         <router-link to="/createAsset" class="mr-4 flex">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Create Asset</span>
          </router-link>
        </li>
       <li>
         <router-link to="/about" class="mr-4 flex">
           <svg class="w-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
           <span>About</span>
          </router-link>
        </li>
     </ul>
    </nav>
    <router-view/>
  </div>
</template>

<style>
</style>
