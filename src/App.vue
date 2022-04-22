<template>
  <div class="mt-12 mx-auto flex flex-col justify-center items-center">
    <nav>
      <router-link to="/" class="text-green-500">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
</style>
