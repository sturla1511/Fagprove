<script setup>
import {ref, watch} from "vue"
import { types } from "~/utils/types.ts";
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

let list = ref(await inventory.getEmployees())

const emit = defineEmits(["filter-list"]);

const router = useRouter()
const route = useRoute()

let sortByNumberOfAssets = ref('high')

let filteredList = ref(list.value)

function filter() {
  if (sortByNumberOfAssets.value === 'low') {
    filteredList.value = list.value.sort((a, b) => a?.assets?.length - b?.assets?.length);
  } else {
    filteredList.value = list.value.sort((a, b) => b?.assets?.length - a?.assets?.length);
  }
  
  filteredList.value = filteredList.value.filter((item) => {
    return (item?.assetsList?.includes(route.query.type) ||  route.query.type === undefined)
  })

  emit("filter-list", filteredList.value);
}

function filterByType(event) {
  const type = event.target.value
  if (type) {
    router.push({ query: { type } })
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
</script>


<template>
  <div class="filter">
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