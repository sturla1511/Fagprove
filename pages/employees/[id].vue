<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

const route = useRoute()

let assets = ref([])

const employee = await inventory.getEmployeeByName(route.params.id)

async function getAssets() {
  assets.value = []
  for (let i = 0; i < employee?.assets?.length; i++) {
    let data = await inventory.getAsset(employee?.assets[i])
    assets.value?.push(data)
  }
  return assets
}
await getAssets()
</script>

<template>
  <div class="container">
    <div class="heading-and-filter">
      <h1>{{ route.params.id.charAt(0).toUpperCase() + route.params.id.slice(1)}}</h1>
      <button @click="inventory.listTypeTable = !inventory.listTypeTable">
        <img
          :src="inventory.listTypeTable ? '/icon/grid.svg' : '/icon/table.svg'"
          :alt="'switch to '+ inventory.listTypeTable ? 'grid list' : 'table'"
        >
      </button>
    </div>
    <AssetTable v-if="inventory.listTypeTable" :list="assets"/>
    <CardList v-else :list="assets"/>
  </div>
</template>

<style scoped lang="scss">
</style>