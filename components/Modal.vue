<script setup>
import { ref } from "vue"

let isOpen = ref(true)
</script>

<template>
  <div
    v-if="isOpen"
    class="modal-backdrop"
    @click.stop="isOpen = false"
  />
  <div
    v-if="isOpen"
    class="modal"
  >
    <div class="modal-header">
      <slot name="header" />
      <button @click="isOpen = false">
        <img src="/icon/closex.svg" alt="close">
      </button>
    </div>
    <div class="modal-main">
      <slot name="main" />
    </div>
    <div class="modal-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
  .modal-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: transparentize($gray-700, 0.5);
    cursor: pointer;
  }
  .modal {
    display: flex;
    flex-flow: column;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    background-color: $white;
    width: 500px;
    height: 500px;
    max-height: 100vh;
    max-width: 100vh;
    border-radius: 16px;
    .modal-header {
      display: flex;
      justify-content: space-between;
      padding: 18px;
      h2 {
        margin: 0;
      }
      button {
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
        margin-left: auto;
        &:hover {
          background: $gray-300;
        }
      }
    }
    .modal-footer {
      display: flex;
      margin-top: auto;
      padding: 18px;
      justify-content: flex-end;
      button {
        font-size: 16px;
      }
      .button-outline {
        background-color: $white;
        border: 2px solid $gray-700;
        border-radius: 6px;
        padding: 4px 6px;
        cursor: pointer;
        &:hover {
          filter: brightness(96%);
        }
      }
      .button-gradiant {
        border: 0;
        background: linear-gradient(90.11deg, #79F1F9 0.17%, #98F6A1 99.98%), #79F1F8;
        border-radius: 6px;
        padding: 6px 8px;
        cursor: pointer;
        &:hover {
          filter: brightness(96%);
        }
        margin-left: auto;
      }
    }
  }
</style>