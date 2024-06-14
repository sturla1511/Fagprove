<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"
import CardList from "~/components/CardList.vue";

const inventory = useInventoryStore()

let assets = ref(await inventory.getAssets())

const route = useRoute()

</script>

<template>
  <div>
    <h1>{{ route.params.id.charAt(0).toUpperCase() + route.params.id.slice(1)}}</h1>
    <CardList :list="assets.filter((asset) => asset.type.toLowerCase() === route.params.id)"/>
  </div>
</template>

<style scoped lang="scss">

</style>