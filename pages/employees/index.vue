<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

let filteredEmployees = ref([])
async function filterList(value) {
  filteredEmployees.value = value
}
</script>

<template>
  <div class="container">
    <div class="heading-and-filter">
      <div class="heading-and-add">
        <h1>Employees</h1>
        <AddModal edit="employee" />
      </div>
      <EmployeeFilter @filter-list="filterList" />
    </div>
    <EmployeeTable v-if="inventory.listTypeTable" :list="filteredEmployees" :key="filteredEmployees"/>
    <CardList v-else :list="filteredEmployees" :key="filteredEmployees"/>
  </div>
</template>

<style scoped lang="scss">
</style>