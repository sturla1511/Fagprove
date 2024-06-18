<script setup>
import { ref } from "vue"

const props = defineProps({
  isModalOpen: Boolean,
  backdropRadius: Boolean,
});


const emit = defineEmits(['update:isModalOpen']);
</script>

<template>
  <div
    v-if="isModalOpen"
    class="modal-backdrop"
    :style="(backdropRadius ? 'border-radius: 16px;' : '')"
    @click.stop="emit('update:isModalOpen', false)"
  />
  <div
    v-if="isModalOpen"
    class="modal"
  >
    <div class="modal-header">
      <slot name="header" />
      <button @click="emit('update:isModalOpen', false)">
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
    z-index: 99;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: black;
    cursor: pointer;
    opacity: 0.5;
  }
  .modal {
    z-index: 100;
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
    height: fit-content;
    max-height: 100vh;
    max-width: 100vh;
    border-radius: 16px;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
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
    .modal-main {
      display: flex;
      flex-flow: column;
      padding: 0 18px;
      width: 100%;
      max-width: calc(100% - 36px);
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