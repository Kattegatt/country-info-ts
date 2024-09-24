<template>
  <div class="mb-3">
    <input
      v-model="searchQuery"
      type="text"
      class="form-control mb-3"
      placeholder="Search for a country"
    />
    <div class="country-list-container">
      <div
        v-for="country in filteredCountries"
        :key="country.countryCode"
        class="card mb-3 router-link-container"
        @click="routeCountry(country.countryCode)"
      >
        <div class="card-body">{{ country.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '../router'
import { CountryFromList } from '../types'

const props = defineProps({
  countries: {
    type: Array as () => CountryFromList[],
    required: true,
  },
})

const searchQuery = ref('')

const filteredCountries = computed((): CountryFromList[] => {
  if (!searchQuery.value) return props.countries
  return props.countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const routeCountry = (countryCode: string): void => {
  router.push({
    name: 'Country',
    params: {
      code: countryCode,
      year: new Date().getFullYear(),
    },
  })
}
</script>

<style scoped>
.country-list-container {
  max-height: 80vh;
  overflow-y: auto;
  border: none #dee2e6;
  padding-right: 4px;
}

.router-link-container {
  cursor: pointer;
}

.router-link-container:hover {
  background-color: rgb(24, 23, 22);
  color: aliceblue;
  transition: linear 0.2s all;
}

/* Custom scrollbar styles for webkit browsers */
.country-list-container::-webkit-scrollbar {
  width: 8px;
}

.country-list-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.country-list-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.country-list-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
