<script setup>
const props = defineProps({
  list: Array,
});
</script>

<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <AssetCard
        v-if="item.type"
        :name="item.name"
        :serial-number="item.serialNumber"
        :type="item.type"
        :employee="item.employee"
      />
      <EmployeeCard
        v-else-if="item.assets"
        :name="item.name"
        :assets="item.assets"
      />
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  padding: 0;
  list-style-type: none;
  margin: 0;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
</style>