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

  filteredList.value = filteredList.value.filter((item) => {
    return (route.query.search === undefined || item?.type?.toLowerCase()?.includes(route.query.search.toLowerCase()) || item?.name?.toLowerCase()?.includes(route.query.search.toLowerCase()) || item?.serialNumber?.toLowerCase()?.includes(route.query.search.toLowerCase()))
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
  } else if (route.query.search && route.query.employee) {
    router.push({ query: { search: route.query.search, employee: route.query.employee } })
  } else if (route.query.search) {
    router.push({ query: { search: route.query.search } })
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
  } else if (route.query.search && route.query.type) {
    router.push({ query: { search: route.query.search, type: route.query.type } })
  } else if (route.query.search) {
    router.push({query: {search: route.query.search}})
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

function search(event) {
  const search = event.target.value
  if (search) {
    router.push({ query: { ...route.query, search } })
  } else if (route.query.employee && route.query.type) {
    router.push({ query: { employee: route.query.employee, type: route.query.type } })
  } else if (route.query.employee) {
    router.push({query: {employee: route.query.employee}})
  } else if (route.query.type) {
    router.push({ query: { type: route.query.type } })
  } else {
    router.push({ query: {} })
  }
}

watch(
  () => route.query, 
    () => {
    filter()
  },
)
watch(
    () => inventory.Assets,
    (newAssets) => {
      list.value = newAssets;
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
    <input @input="search" type="search" :value="route.query.search" placeholder="Search">
    <fieldset @input="changeDateSort">
      <legend>Sort by date</legend>
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