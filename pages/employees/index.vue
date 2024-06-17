<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

let employees = ref(await inventory.getEmployees())
let filteredEmployees = ref(employees.value)

function filterList(value) {
  filteredEmployees.value = value
}

const route = useRoute()
</script>

<template>
  <div class="container">
    <div class="heading-and-filter">
      <h1>Employees</h1>
      <EmployeeFilter :list="employees" @filter-list="filterList" />
    </div>
    <EmployeeTable v-if="inventory.listTypeTable" :list="filteredEmployees" :key="filteredEmployees"/>
    <CardList v-else :list="filteredEmployees" :key="filteredEmployees"/>
  </div>
</template>

<style scoped lang="scss">
</style>