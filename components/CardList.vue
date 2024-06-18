<script setup>
const props = defineProps({
  list: Array,
});
</script>

<template>
  <ul v-if="list?.length">
    <li v-for="(item, index) in list" :key="index">
      <AssetCard
        v-if="item.type"
        :id="item.id"
        :name="item.name"
        :serial-number="item.serialNumber"
        :type="item.type"
        :employee="item.employee"
      />
      <EmployeeCard
        v-else-if="item.assets"
        :id="item.id"
        :name="item.name"
        :assets="item.assets"
      />
    </li>
  </ul>
  <div v-else class="not-found">
    No items found
  </div>
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