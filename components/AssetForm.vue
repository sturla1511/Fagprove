<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"
import { types, typeIcon, typeColor } from "~/utils/types.ts";

const inventory = useInventoryStore()

const props = defineProps({
  form: Object
});
const emit = defineEmits(['updated-form']);

let employees = ref(await inventory.getEmployees())

let editForm = ref({ 
  id: props?.form?.id,
  name: props?.form?.name, 
  serialNumber: props?.form?.serialNumber,
  type: props?.form?.type,
  employee: props?.form?.employee
})

function updateValue(event) {
  editForm.value[event?.target?.id] = event?.target?.value
  emit('updated-form', editForm.value)
}
</script>

<template>
  <form>
    <div class="form-row">
      <label for="name">
        Name
        <input 
          id="name" 
          name="name" 
          type="text" 
          :value="form?.name"
          @input="updateValue"
        >
      </label>
      <label for="serialNumber">
        Serial Number
        <input 
          id="serialNumber" 
          name="serialNumber"
          type="text" 
          :value="form?.serialNumber"
          @input="updateValue"
        >
      </label>
    </div>
    <div class="form-row">
      <label for="type">
        Type
        <select id="type" name="type" @input="updateValue">
          <option value="">
            Select type
          </option>
          <option 
            v-for="(type, index) in types" 
            :key="index"
            :value="type"
            :selected="form?.type === type"
          >
            {{ type }}
          </option>
        </select>
      </label>
      <label for="employee">
        Employee
        <select id="employee" name="employee" @input="updateValue">
          <option value="">
            Select employee
          </option>
          <option
            v-for="(employee, index) in employees"
            :key="index"
            :value="employee?.id"
            :selected="form?.employee === employee?.id"
          >
            {{ employee?.name }}
          </option>
        </select>
      </label>
    </div>
  </form>
</template>

<style scoped lang="scss">
</style>