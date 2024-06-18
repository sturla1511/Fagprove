<script setup>
import { ref } from "vue"
import { typeIcon, typeColor } from "~/utils/types.ts";
import { useInventoryStore } from "~/stores/inventory.ts"
import EditModal from "~/components/EditModal.vue";

const inventory = useInventoryStore()

const props = defineProps({
  id: String,
  name: String,
  serialNumber: String,
  type: String,
  employee: String
});

let card = ref({
  id: props.id,
  name: props.name,
  serialNumber: props.serialNumber,
  type: props.type,
  employee: props.employee
})

async function updatedItem(event) {
  card.value = event
  employeeName.value = await inventory.getEmployeeName(card.value.employee)
}

let employeeName = ref(await inventory.getEmployeeName(card.value.employee))
</script>

<template>
  <div class="card-container">
    <div class="card-header">
      <div class="icon" :style="'background-color: ' + typeColor(card.type)">
        <img :src="typeIcon(card.type)">
      </div>
      <div class="type" :style="'background-color: ' + typeColor(card.type)">{{ card.type }}</div>
    </div>
    <h2>{{ card.name }}</h2>
    <span class="serial-number">{{ card.serialNumber }}</span>
    <div class="card-footer">
      <span>{{ employeeName }}</span>
      <EditModal
        edit="asset"
        :form="card"
        @updated-item="updatedItem"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  display: flex;
  flex-flow: column;
  padding: 8px 12px;
  
  background: $gray-100;
  border: 1px solid $gray-200;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  height: calc(100% - 16px);
  max-width: 600px;
  .card-header {
    display: flex;
    justify-content: space-between;
    .icon {
      display: flex;
      background-color: $blue-500;
      height: 40px;
      width: 40px;
      border-radius: 6px;
      translate: 0 -12px;
      img {
        width: 30px;
        height: 30px;
        margin: auto;
      }
    }
    .type {
      background-color: $blue-500;
      height: fit-content;
      padding: 3px 5px;
      border-radius: 6px;
    }
  }
  h2 {
    margin: 0;
  }
  .serial-number {
    font-size: 18px;
  }
  .card-footer {
    display: flex;
    padding-top: 6px;
    margin-top: auto;
    justify-content: space-between;
    span {
      margin-top: auto;
    }
  }
}
</style>