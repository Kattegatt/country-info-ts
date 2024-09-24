<template>
  <div class="list-container">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <ul v-else class="list-group">
      <div v-for="holiday in holidays" :key="holiday.date" class="card mb-3">
        <div class="card-body">
          <h5 v-if="holiday.localName != holiday.name">
            {{ holiday.localName }} ({{ holiday.name }})
          </h5>
          <h5 v-else>{{ holiday.name }}</h5>
          <p class="m-0">Date: {{ holiday.date }}</p>
          <p class="m-0">Type: {{ holiday.types.join(', ') }}</p>
        </div>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Holiday } from '../types'
defineProps({
  holidays: Array as () => Holiday[],
  loading: Boolean,
})
</script>

<style>
.list-container {
  padding-bottom: 10vh;
}
</style>
