<script setup>

import SideBarMenu from "~/components/SideBarMenu.vue";
</script>

<template>
  <div class="default-layout">
    <header>
      <SideBarMenu />
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-flow: column;
  justify-content: center;
  background-color: $gray-200;
  max-width: 100%;
  height: 100%;
  main {
    background-color: $white;
    width: calc(100% - 32px);
    max-width: $max-width;
    min-height: calc(100vh - 86px);
    padding: 0 16px 16px 16px;
    border-radius: 0;
    margin: 0;
  }
}

@media (min-width: $breakpoint-sm) {
  .default-layout {
    main {
      padding: 0 22px 22px 22px;
      border-radius: 0 0 16px 16px;
      margin: 0 16px 16px 16px;
      min-height: calc(100vh - 139px);
      width: calc(100% - 44px - 32px);
    }
    header {
      margin: 16px 16px 0 16px;
    }
  }
}

@media (min-width:  $breakpoint-md) {
  .default-layout {
    flex-flow: row;
    margin-right: auto;
    margin-left: auto;
    justify-content: unset;
    max-width: calc($max-width + 64px + 232px + 232px);
    main {
      border-radius: 16px;
      margin: 32px;
      min-height: calc(100vh - 86px);
    }
    header {
      margin: 32px 0 32px 32px;
      max-height: calc(100vh - 64px);
      min-width: 200px;
      display: flex;
      justify-content: flex-end;
      width: 200px;
    }
  }
}
</style>