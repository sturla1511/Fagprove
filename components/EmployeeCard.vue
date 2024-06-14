<script setup>
import { typeIcon, typeColor } from "~/utils/types.ts";
import { useInventoryStore } from "~/stores/inventory.ts"
import { ref } from "vue"

const inventory = useInventoryStore()

const props = defineProps({
  name: String,
  assets: Array
});

let assets = ref([])
async function getAssets() {
  assets.value = []
  for (let i = 0; i < props?.assets?.length; i++) {
    let data = await inventory.getAsset(props?.assets[i])
    assets.value?.push(data)
  }
  return assets.value
}

await getAssets()
</script>

<template>
  <nuxt-link class="card-container" :to="'/employees/'+name">
    <div class="card-header">
      <h2>{{ name }}</h2>
      <div class="type">
        {{ assets?.length }} assets
      </div>
    </div>
    <ul v-if="assets?.length > 0">
      <li v-for="(asset, index) in assets" :key="index">
        <div class="icon" :style="'background-color: ' + typeColor(asset.type)">
          <img :src="typeIcon(asset.type)" :alt="'asset type: ' + asset.type">
        </div>
      </li>
    </ul>
    <div class="card-footer">
      <span>See assets</span>
    </div>
  </nuxt-link>
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
  
  color: black;
  text-decoration-line: none;
  &:hover {
    background-color: darken($gray-100, 2%);
    box-shadow: inset 2px 4px 4px rgba(0, 0, 0, 0.1);
    h2 {
      text-decoration-line: underline;
    }
    .card-footer {
      span {
        font-weight: bold;
      }
    }
  }
  ul {
    display: flex;
    gap: 8px;
    padding: 0;
    list-style-type: none;
    margin: 12px 0;
    height: fit-content;
    li {
      .icon {
        display: flex;
        background-color: $blue-500;
        height: 28px;
        width: 28px;
        border-radius: 6px;
        img {
          width: 20px;
          height: 20px;
          margin: auto;
        }
      }
    }
  }
  .card-header {
    display: flex;
    gap: 6px;
    h2 {
      margin: 0;
    }
    .type {
      margin-left: auto;
      background-color: $blue-500;
      height: fit-content;
      padding: 3px 5px;
      border-radius: 6px;
    }
  }
  .card-footer {
    display: flex;
    margin-top: 8px;
    justify-content: flex-end;
    span {
      color: black;
      text-decoration-line: underline;
    }
  }
}
</style>