<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

let assets = ref(await inventory.getAssets())
</script>

<template>
  <div>
    <h1>Assets</h1>
    <ul>
      <li v-for="(asset, index) in assets" :key="index">
        {{ asset.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">

</style>