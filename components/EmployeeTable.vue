<script setup>
import { ref } from "vue";
import TypeId from "~/components/TypeId.vue";
import { useInventoryStore } from "~/stores/inventory.ts"

const inventory = useInventoryStore()

const props = defineProps({
  list: Array,
});

let employeeList = ref(props?.list)
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
              <li v-for="(asset, index) in item?.assets" :key="index">
                <TypeId :id="asset" list-type="table" />
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
          <div class="edit">
            <EditModal
              v-if="item?.id !== '0'"
              edit="employee"
              :form="employeeList[rowIndex]"
            />
          </div>
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
      height: 29.33px;
      td {
        padding: 3px 6px;
        vertical-align: center;
        align-items: center;
        .assets {
          display: flex;
          gap: 4px;
          font-weight: bold;
          align-items: center;
        }
        .edit {
          display: flex;
          align-items: center;
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
              margin-top: auto;
              width: 16px;
              height: 16px;

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