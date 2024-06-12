<script setup>

</script>

<template>
  <div class="default-layout">
    <main>
      <slot/>
    </main>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  justify-content: center;
  background-color: $gray-200;
  width: 100%;
  height: 100%;
  main {
    background-color: $white;
    width: 100%;
    max-width: $max-width;
    min-height: calc(100vh - 32px);
    padding: 16px;
    border-radius: 0;
    margin: 0;
  }
}

@media (min-width: $breakpoint-sm) {
  .default-layout {
    main {
      padding: 22px;
      border-radius: 16px;
      margin: 16px;
      min-height: calc(100vh - 76px);
    }
  }
}

@media (min-width:  $breakpoint-md) {
  .default-layout {
    main {
      margin: 32px;
      min-height: calc(100vh - 108px);
    }
  }
}
</style>