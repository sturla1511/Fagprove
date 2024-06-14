<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

let employees = ref(await inventory.getEmployees())

const route = useRoute()

let listTypeTable = ref(false)
</script>

<template>
  <div class="container">
    <div class="heading-and-filter">
      <h1>Employees</h1>
      <button @click="inventory.listTypeTable = !inventory.listTypeTable">
        <img
          :src="inventory.listTypeTable ? '/icon/grid.svg' : '/icon/table.svg'"
          :alt="'switch to '+ inventory.listTypeTable ? 'grid list' : 'table'"
        >
      </button>
    </div>
    <EmployeeTable v-if="inventory.listTypeTable" :list="employees"/>
    <CardList v-else :list="employees"/>
  </div>
</template>

<style scoped lang="scss">
</style>