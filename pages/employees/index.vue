<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()
const route = useRoute()

let employees = ref(await inventory.getEmployees())

let assetList = ref([])

async function addAssetType() {
  for (let e = 0; e < employees.value?.length; e++) {
    assetList.value = []
    for (let i = 0; i < employees.value[e]?.assets?.length; i++) {
      let data = await inventory.getAsset(employees.value[e]?.assets[i])
      assetList.value.push(data.type)
    }
    employees.value[e] = {...employees.value[e], assetsList: assetList.value}
  }
}
await addAssetType()

let filteredEmployees = ref(
    employees.value.filter((item) => {
      return (item?.assetsList?.includes(route.query.type) ||  route.query.type === undefined)
    }).filter((item) => {
      return (route.query.search === undefined || item?.name?.toLowerCase()?.includes(route.query.search.toLowerCase()) || item?.id?.toLowerCase()?.includes(route.query.search.toLowerCase()))
    }).sort((a, b) => b?.assets?.length - a?.assets?.length)
)

async function filterList(value) {
  await addAssetType()
  filteredEmployees.value = value
}

async function addItem(event) {
  filteredEmployees?.value?.push(event)
}
</script>

<template>
  <div class="container">
    <div class="heading-and-filter">
      <div class="heading-and-add">
        <h1>Employees</h1>
        <AddModal edit="employee" @added-item="addItem" />
      </div>
      <EmployeeFilter :list="employees" @filter-list="filterList" />
    </div>
    <EmployeeTable v-if="inventory.listTypeTable" :list="filteredEmployees" :key="filteredEmployees"/>
    <CardList v-else :list="filteredEmployees" :key="filteredEmployees"/>
  </div>
</template>

<style scoped lang="scss">
</style>