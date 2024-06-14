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
    <h1>Assets</h1>
    <CardList :list="assets"/>
  </div>
</template>

<style scoped lang="scss">

</style>