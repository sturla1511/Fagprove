<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

let employees = ref(await inventory.getEmployees())

const route = useRoute()
</script>

<template>
  <div>
    <h1>Employees</h1>
    <CardList :list="employees"/>
  </div>
</template>

<style scoped lang="scss">

</style>