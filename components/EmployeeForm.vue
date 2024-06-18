<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

const props = defineProps({
  form: Object
});

const emit = defineEmits(['updated-form']);

let employees = ref(await inventory.getEmployees())

let editForm = ref({ 
  id: props?.form?.id,
  name: props?.form?.name
})

function updateValue(event) {
  editForm.value[event?.target?.id] = event?.target?.value
  console.log(editForm.value)
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
    </div>
  </form>
</template>

<style scoped lang="scss">
</style>