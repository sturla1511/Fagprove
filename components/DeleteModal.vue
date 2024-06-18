<script setup>
import {ref} from "vue";
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

const props = defineProps({
  edit: String,
  form: Object
});
const emit = defineEmits(['deleted-item']);

let isDeleteModalOpen = ref(false);

let errorMessage = ref('')

function deleteItem() {
  errorMessage.value = "";
  let result = ref()
  
  if (props.edit === 'asset') {
    result.value = inventory.deleteAsset(props?.form?.id)
  } else if (props.edit === 'employee') {
    result.value = inventory.deleteEmployee(props?.form?.id)
  }
  
  if (result?.value?.status?.value === "error") {
    errorMessage.value = "Failed to delete " + props?.edit;
  } else {
    isDeleteModalOpen.value = false
    emit('deleted-item', props?.form?.id)
  }
}
</script>

<template>
  <Modal v-model:isModalOpen="isDeleteModalOpen" :backdrop-radius="true">
    <template #header>
      <h2>Delete {{ edit === 'employee' ? 'Employee' : 'Asset' }}</h2>
    </template>
    <template #main>
      <div>Are you sure you want to delete</div>
      <div class="item-to-delete" v-if="form?.name">
        {{ form.name }}
      </div>
      <div v-if="form?.serialNumber">
        {{ form.serialNumber }}
      </div>
    </template>
    <template #footer>
      <button class="button-outline" @click="deleteItem">
        Delete
      </button>
    </template>
  </Modal>
  <button class="button-outline" @click="isDeleteModalOpen = true">
    Delete
  </button>
</template>

<style scoped lang="scss">
  .item-to-delete {
    font-size: 20px;
    font-weight: bold;
  }
</style>