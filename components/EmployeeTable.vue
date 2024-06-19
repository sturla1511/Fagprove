<script setup>
import { ref } from "vue";
import { useInventoryStore } from "~/stores/inventory.ts"
import { typeIcon, typeColor } from "~/utils/types.ts";

const inventory = useInventoryStore()

const props = defineProps({
  list: Array,
});

let employeeList = ref(props?.list)

function updatedItem(event, index) {
  employeeList.value[index] = event
}

function deletedItem(index) {
  employeeList?.value?.splice(index, 1)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Assets</th>
        <th class="link-column">
          link
        </th>
        <th class="edit-column">
          Edit
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, rowIndex) in employeeList" :key="rowIndex" :class="rowIndex % 2 === 0 ? 'row-odd' : 'row-even'">
        <td>
          {{ item?.name }}
        </td>
        <td>
          <div class="assets">
            {{ item?.assets?.length }}:
            <ul v-if="item?.assetsList?.length > 0">
              <li v-for="(asset, index) in item?.assetsList" :key="index">
                <img :src="typeIcon(asset)" :alt="'asset type: ' + asset">
              </li>
            </ul>
          </div>
        </td>
        <td class="link-column">
          <nuxt-link :to="{ path: '/assets', query: { employee: item?.id } }">
            See assets
          </nuxt-link>
        </td>
        <td class="edit-column">
          <EditModal
            edit="employee"
            :form="employeeList[rowIndex]"
            @updated-item="updatedItem($event, rowIndex)"
            @deleted-item="deletedItem(rowIndex)"
          />
        </td>
      </tr>
      <tr v-if="employeeList?.length === 0" :class="'row-odd'">
        <td>
          no items found
        </td>
        <td></td>
        <td class="link-column"></td>
        <td class="edit-column"></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  border-spacing: 0;
  tbody, thead {
    tr {
      .edit-column {
        width: 36px;
      }
      .link-column {
        width: 100px;
        color: black;
        a, nuxt-link {
          color: black;
          display: flex;
          &:hover {
            font-weight: bold;
            .link {
              width: 18px;
            }
          }
        }
      }
    }
  }
  thead {
    tr {
      th {
        text-align: left;
        background: $gray-100;
        border: 1px solid $gray-200;
        box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 4px 6px;
        font-weight: bold;
        font-size: 18px;
        &:first-child {
          border-radius: 6px 0 0 0;
        }
        &:last-child {
          border-radius: 0 6px 0 0;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 3px 6px;
        .assets {
          display: flex;
          gap: 4px;
          font-weight: bold;
        }
        button {
          cursor: pointer;
          padding: 0;
          border: 0;
          background-color: transparent;
          .edit {
            width: 16px;
            height: 18px;
          }
          &:hover {
            .edit {
              width: 18px;
            }
          }
        }
        ul {
          display: flex;
          gap: 6px;
          padding: 0;
          list-style-type: none;
          margin: 0;
          height: fit-content;
          width: fit-content;
          li {
            img {
              width: 16px;
              height: 16px;
              margin: auto;
            }
          }
        }
      }
    }
    .row-odd {
      td {
        background: $gray-300;
        border: 1px solid $gray-200;
        box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
      }
    }
    .row-even {
      td {
        background: $gray-100;
        border: 1px solid $gray-200;
        box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>