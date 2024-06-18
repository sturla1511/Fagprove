<script setup>
import { ref } from "vue"
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

const props = defineProps({
  list: Array,
});

let assetList = ref(props?.list)
async function addEmployeeName() {
  assetList.value = []
  for (let i = 0; i < props.list?.length; i++) {
    let data = await inventory.getEmployeeName(props.list[i]?.employee)
    assetList.value?.push({...props.list[i], employeeName: data})
  }
  return assetList.value
}

await addEmployeeName()

async function updatedItem(event, id) {
  assetList.value[id] = event
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th class="serial-number">Serial Number</th>
        <th>Type</th>
        <th>Employee</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, rowIndex) in assetList" :key="rowIndex" :class="rowIndex % 2 === 0 ? 'row-odd' : 'row-even'">
        <td>
          {{ item?.name }}
        </td>
        <td class="serial-number">
          {{ item?.serialNumber }}
        </td>
        <td>
          {{ item?.type }}
        </td>
        <td>
          {{ item?.employeeName }}
        </td>
        <td>
          <EditModal
            edit="asset"
            :form="assetList[rowIndex]"
            @updated-item="updatedItem($event, rowIndex)"
          />
        </td>
      </tr>
      <tr v-if="assetList?.length === 0" :class="'row-odd'">
        <td>
          no items found
        </td>
        <td class="serial-number"></td>
        <td></td>
        <td></td>
        <td></td>
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
      .serial-number {
        display: none;
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
@media (min-width: $breakpoint-sm) {
  table {
    tbody, thead {
      tr {
        .serial-number {
          display: table-cell;
        }
      }
    }
  }
}

@media (min-width: $breakpoint-md) and (max-width: $breakpoint-md + 150px) {
  table {
    tbody, thead {
      tr {
        .serial-number {
          display: none;
        }
      }
    }
  }
}
</style>