<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"
import CardList from "~/components/CardList.vue";

const inventory = useInventoryStore()

let assets = ref(await inventory.getAssets())

const route = useRoute()
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
    <AssetTable v-if="inventory.listTypeTable" :list="assets?.filter((asset) => asset.type.toLowerCase() === route.params.id)"/>
    <CardList v-else :list="assets?.filter((asset) => asset.type.toLowerCase() === route.params.id)"/>
  </div>
</template>

<style scoped lang="scss">
</style>