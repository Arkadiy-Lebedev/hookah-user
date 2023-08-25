<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';

</script>

<template>
    <div class="spinner-wrapper">
      <div class="card flex justify-content-center">
        <ProgressSpinner />
    </div>
    </div>
  
</template>

<style scoped>
.spinner-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

</style>
