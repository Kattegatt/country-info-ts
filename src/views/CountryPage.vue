<template>
  <div class="container mt-4">
    <div class="row d-flex align-items-center">
      <div class="col d-flex align-items-center mb-3">
        <button class="btn btn-outline-dark me-3" @click="routeHome">
          <span class="material-symbols-outlined">&laquo;</span>
        </button>
        <h1 class="mb-0">{{ countryName }}</h1>
      </div>
    </div>
    <HolidayList :holidays="holidays" :loading="loading" />
    <YearSelector :selectedYear="selectedYear" @year-changed="changeYear" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCountries } from '../composables/useCountries'
import { useHolidays } from '../composables/useHolidays'
import YearSelector from '../components/YearSelector.vue'
import HolidayList from '../components/HolidayList.vue'
import { getYearParam, getCodeParam } from '../utils/params'
const route = useRoute()
const router = useRouter()
const { fetchOneCountry } = useCountries()
const { holidays, loading, fetchHolidays } = useHolidays()

// Utility to ensure params.year is a string, whether it's a string or array
// const getYearParam = (): string => {
//   const yearParam = route.params.year
//   return Array.isArray(yearParam) ? yearParam[0] : yearParam
// }

// const getCodeParam = (): string => {
//   const codeParam = route.params.code
//   return Array.isArray(codeParam) ? codeParam[0] : codeParam
// }

const countryCode: Ref<string> = ref(getCodeParam(route))

const selectedYear = ref(
  parseInt(getYearParam(route)) || new Date().getFullYear()
)
const countryName = ref('')

const routeHome = () => {
  router.push({ name: 'Home' })
}

const changeYear = (year: number) => {
  selectedYear.value = year
  router.push({
    name: 'Country',
    params: { code: countryCode.value, year: year.toString() },
  })
}

const updateDataFromRoute = async () => {
  selectedYear.value = parseInt(getYearParam(route)) || new Date().getFullYear()
  await fetchHolidays(countryCode.value, selectedYear.value)
}

onMounted(async () => {
  updateDataFromRoute()

  const country = await fetchOneCountry(countryCode.value)
  if (country) countryName.value = country.officialName
})

watchEffect(() => {
  if (
    route.params.code !== countryCode.value ||
    parseInt(getYearParam(route)) !== selectedYear.value
  ) {
    updateDataFromRoute()
  }
})
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

p {
  padding: 0;
  margin: 0;
}

h1 {
  margin-bottom: 0;
}
</style>
