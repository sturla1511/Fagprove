<script setup>
import {ref, watch} from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"
import CardList from "~/components/CardList.vue";

const inventory = useInventoryStore()
const route = useRoute()

let assets = ref(await inventory.getAssets())
let employee = ref('')

let filteredAssets = ref(
    assets.value.filter((item) => {
      return (item.type === route.query.type || route.query.type === undefined) && (item.employee === route?.query?.employee?.toString() || route.query.employee === undefined)
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
)
function filterList(value) {
  filteredAssets.value = value
}

async function employeeName() {
  employee.value = await inventory.getEmployeeName(route?.query?.employee)
}
employeeName()

watch(
    () => route.query,
    () => {
      employeeName()
    },
)
</script>

<template>
  <div class="container">
    <div class="heading-and-filter">
      <h1 :key="employee+route?.query?.type">
        <span v-if="employee">{{ employee }}</span>
        {{ route?.query?.type ? route?.query?.type : 'Assets' }}
      </h1>
      <AssetFilter @filter-list="filterList" />
    </div>
    <AssetTable v-if="inventory.listTypeTable" :list="filteredAssets" :key="filteredAssets" />
    <CardList v-else :list="filteredAssets" :key="filteredAssets" />
  </div>
</template>

<style scoped lang="scss">
</style>