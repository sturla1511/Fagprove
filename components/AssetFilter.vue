<script setup>
import { ref, watch } from "vue"
import { types } from "~/utils/types.ts";
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

let list = ref(await inventory.getAssets())

const emit = defineEmits(["filter-list"]);

const router = useRouter()
const route = useRoute()

const employees = await inventory.getEmployees()

let sortByDate = ref('new')

let filteredList = ref(list.value)

function filter() {
  filteredList.value = list.value.filter((item) => {
    return (item.type === route.query.type || route.query.type === undefined) && (item.employee === route?.query?.employee?.toString() || route.query.employee === undefined)
  })
  
  if (sortByDate.value === 'new') {
    filteredList.value = filteredList.value.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    filteredList.value = filteredList.value.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  
  emit("filter-list", filteredList.value);
}

function filterByType(event) {
  const type = event.target.value
  if (type) {
    router.push({ query: { ...route.query, type } }) 
  } else if (route.query.employee) {
    router.push({ query: { employee: route.query.employee } })
  } else {
    router.push({ query: {} })
  }
}

function filterByEmployee(event) {
  const employee = event.target.value
  if (employee) {
    router.push({ query: { ...route.query, employee } })
  } else if (route.query.type) {
    router.push({ query: { type: route.query.type } })
  } else {
    router.push({ query: {} })
  }
}

function changeDateSort(event) {
  sortByDate.value = event?.target?.value
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
      <label for="old" :class="{'radio-selected': sortByDate === 'old'}">
        old
        <input class="sr-only" type="radio" id="old" name="date" value="old" />
      </label>
      <label for="new" :class="{'radio-selected': sortByDate === 'new'}">
        new
        <input class="sr-only" type="radio" id="new" name="date" value="new" />
      </label>
    </fieldset>
    <label>
      Employees
      <select @input="filterByEmployee">
        <option value="">
          Select
        </option>
        <option 
          v-for="(employee, index) in employees" 
          :key="index" 
          :value="employee?.id" 
          :selected="route.query.employee === employee?.id"
        >
          {{ employee?.name }}
        </option>
      </select>
    </label>
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