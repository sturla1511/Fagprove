<script setup>
import { ref } from "vue"
import AssetForm from "~/components/AssetForm.vue";
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

const props = defineProps({
  edit: String,
  form: Object
});

let isModalOpen = ref(false);

let editedForm = ref(props.form) 
let errorMessage = ref('')

function changeForm(event) {
  editedForm.value = { ...editedForm.value, ...event}
}

function saveChanges() {
  errorMessage.value = "";
  let result = ref()

  if (props.edit === 'asset') {
    result.value = inventory.updateAsset(editedForm.value)
  } else if (props.edit === 'employee') {
    result.value = inventory.updateEmployeesName(editedForm.value)
  }

  if (result?.value?.status?.value === "error") {
    errorMessage.value = "Failed to update " + props?.edit;
  } else {
    isModalOpen.value = false;
  }
}

function deletedItem() {
  isModalOpen.value = false
}
</script>

<template>
  <Modal v-model:isModalOpen="isModalOpen">
    <template #header>
      <h2>Edit {{ edit === 'employee' ? 'Employee' : 'Asset' }}</h2>
    </template>
    <template #main>
      <AssetForm 
        v-if="edit === 'asset'" 
        :form="form"
        @updated-form="changeForm"
      />
      <EmployeeForm
        v-else-if="edit === 'employee'"
        :form="form"
        @updated-form="changeForm"
      />
    </template>
    <template #footer>
      <DeleteModal :edit="edit" :form="form" @deleted-item="deletedItem" />
      <button class="button-gradiant" @click="saveChanges">
        Save
      </button>
    </template>
  </Modal>
  <button class="open-modal" @click="isModalOpen = true">
    <img class="edit" src="/icon/pencil.svg" :alt="'edit '+form?.name">
  </button>
</template>

<style scoped lang="scss">
.open-modal {
  cursor: pointer;
  padding: 0;
  border: 0;
  background-color: transparent;
  max-height: 100%;
  .edit {
    display: flex;
    width: 16px;
    height: 18px;
    max-height: 100%;
  }
  &:hover {
    .edit {
      width: 18px;
    }
  }
}
</style>