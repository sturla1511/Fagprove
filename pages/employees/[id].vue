<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

let assets = ref(await inventory.getAssets())

const route = useRoute()

</script>

<template>
  <div>
    <h1>{{ route.params.id.charAt(0).toUpperCase() + route.params.id.slice(1)}}</h1>
    <ul>
      <li v-for="(asset, index) in assets" :key="index">
        {{ asset.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">

</style>