<script setup>
import {ref} from "vue";
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

const props = defineProps({
  edit: String,
});

let isModalOpen = ref(false);

let editedForm = ref(props.form)
let errorMessage = ref('')

function changeForm(event) {
  editedForm.value = { ...editedForm.value, assets: [], ...event}
}
async function addItem() {
  errorMessage.value = "";
  let result = ref()

  if (props.edit === 'asset') {
    result.value = await inventory.addAsset(editedForm?.value)
  } else if (props.edit === 'employee') {
    result.value = await inventory.addEmployee(editedForm.value)
  }

  if (result?.value?.status?.value === "error") {
    errorMessage.value = "Failed to add " + props?.edit;
  } else {
    isModalOpen.value = false
  }
}
</script>

<template>
  <Modal v-model:isModalOpen="isModalOpen">
    <template #header>
      <h2>
        Add 
        {{ (edit === 'asset' ? 'Asset' : 'Employee') }}
      </h2>
    </template>
    <template #main>
      <AssetForm
        v-if="edit === 'asset'"
        @updated-form="changeForm"
      />
      <EmployeeForm
        v-else-if="edit === 'employee'"
        @updated-form="changeForm"
      />
    </template>
    <template #footer>
      <button class="button-gradiant" @click="addItem">
        Add
      </button>
    </template>
  </Modal>
  <button class="open-modal" @click="isModalOpen = true">
    <img class="add" src="/icon/add.svg" :alt="'create new ' + edit">
  </button>
</template>

<style scoped lang="scss">
  .open-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $gray-100;
    border: 1px solid $gray-200;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 4px;
    width: 28px;
    height: 28px;
    cursor: pointer;
    margin: 0;

    &:hover {
      background: $gray-300;
    }
    img {
      width: 14px;
      height: 14px;
    }
  }
</style>