<script setup>
import { typeIcon, typeColor } from "~/utils/types.ts";
import { ref } from "vue";
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

const props = defineProps({
  id: String,
  listType: String
});

let asset = ref(await inventory.getAsset(props?.id))
</script>

<template>
  <div 
    v-if="asset" 
    class="icon" 
    :class="listType === 'table' ? 'icon-on-table' : 'icon-on-card'" 
    :style="'background-color: ' + typeColor(asset?.type)"
  >
    <img :src="typeIcon(asset?.type)" :alt="asset?.type">
  </div>
</template>

<style scoped lang="scss">
.icon {
  display: flex;
  height: 28px;
  width: 28px;
  border-radius: 6px;
  &.icon-on-table {
    height: 22px;
    width: 22px;
    img {
      width: 16px;
      height: 16px;
      margin: auto;
    }
  }
  &.icon-on-card {
    height: 28px;
    width: 28px;
    img {
      width: 20px;
      height: 20px;
      margin: auto;
    }
  }
}
</style>