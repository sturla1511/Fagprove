<script setup>

</script>

<template>
  <div class="default-layout">
    <main>
      <slot/>
    </main>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
    background-color: #ECF0F4;
  }
</style>

<style scoped lang="scss">
.default-layout {
  display: flex;
  justify-content: center;
  background-color: #ECF0F4;
  width: 100%;
  height: 100%;
  main {
    background-color: white;
    width: 100%;
    max-width: 1200px;
    min-height: calc(100vh - 32px);
    padding: 16px;
    border-radius: 0;
    margin: 0;
  }
}

@media (min-width: 560px) {
  .default-layout {
    main {
      padding: 22px;
      border-radius: 16px;
      margin: 16px;
      min-height: calc(100vh - 76px);
    }
  }
}

@media (min-width: 770px) {
  .default-layout {
    main {
      background-color: white;
      width: 100%;
      max-width: 1200px;
      margin: 32px;
      min-height: calc(100vh - 108px);
    }
  }
}
</style>