<script setup>
import {ref, watch} from "vue"
import { types } from "~/utils/types.ts";
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

const props = defineProps({
  list: Array,
});

let employeeList = ref(props.list)

const emit = defineEmits(["filter-list"]);

const router = useRouter()
const route = useRoute()

let sortByNumberOfAssets = ref('high')

let filteredList = ref(props.list)

function filter() {
  if (sortByNumberOfAssets.value === 'low') {
    filteredList.value = employeeList.value.sort((a, b) => a?.assets?.length - b?.assets?.length);
  } else {
    filteredList.value = employeeList.value.sort((a, b) => b?.assets?.length - a?.assets?.length);
  }
  
  filteredList.value = filteredList.value.filter((item) => {
    return (route.query.search === undefined || item?.name?.toLowerCase()?.includes(route.query.search.toLowerCase()) || item?.id?.toLowerCase()?.includes(route.query.search.toLowerCase()) || item?.assetsList?.join(', ').toLowerCase().includes(route.query.search.toLowerCase()))
  })
  
  filteredList.value = filteredList.value.filter((item) => {
    return (item?.assetsList?.includes(route.query.type) ||  route.query.type === undefined)
  })

  emit("filter-list", filteredList.value);
}

function filterByType(event) {
  const type = event.target.value
  if (type) {
    router.push({ ...route.query, query: { type } })
  } else if (route.query.search) {
    router.push({ query: { search: route.query.search } })
  } else {
    router.push({ query: {} })
  }
}
function search(event) {
  const search = event.target.value
  if (search) {
    router.push({ query: { ...route.query, search } })
  } else if (route.query.type) {
    router.push({ query: { type: route.query.type } })
  } else {
    router.push({ query: {} })
  }
}

function changeDateSort(event) {
  sortByNumberOfAssets.value = event?.target?.value
  filter()
}

watch(
  () => route.query,
  () => {
    filter()
  },
)

watch(
    () => inventory.Employees,
    (newEmployees) => {
      employeeList.value = newEmployees;
      filter()
    },
    { deep: true }
);
</script>


<template>
  <div class="filter">
    <label for="search" class="sr-only">
      search
    </label>
    <input
      @input="search" 
      id="search"
      name="search"
      type="search" 
      :value="route.query.search" 
      placeholder="Search"
    >
    <fieldset @input="changeDateSort">
      <legend>Number of assets</legend>
      <label for="high" :class="{'radio-selected': sortByNumberOfAssets === 'high'}">
        high
        <input 
          class="sr-only" 
          type="radio" 
          id="high" 
          name="assets" 
          value="high" 
        >
      </label>
      <label for="low" :class="{'radio-selected': sortByNumberOfAssets === 'low'}">
        low
        <input 
          class="sr-only" 
          type="radio" 
          id="low"
          name="assets" 
          value="low" 
        >
      </label>
    </fieldset>
    <label>
      Type
      <select @input="filterByType">
        <option value="">
          Select
        </option>
        <option 
          v-for="(type, index) in types" 
          :key="index" 
          :value="type"
          :selected="route.query.type === type"
        >
          {{ type }}
        </option>
      </select>
    </label>
    <button @click="inventory.listTypeTable = !inventory.listTypeTable">
      <img
        :src="inventory.listTypeTable ? '/icon/grid.svg' : '/icon/table.svg'"
        :alt="'switch to '+ inventory.listTypeTable ? 'grid list' : 'table'"
      >
    </button>
  </div>
</template>

<style scoped lang="scss">
</style>