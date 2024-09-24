<template>
  <div class="card">
    <div class="card-header">Explore random holidays</div>
    <div v-if="!loading" class="card-body">
      <div
        v-for="country in randomCountries"
        :key="country.countryCode"
        class="mb-3"
      >
        <h5 class="card-title">{{ country.name }}</h5>
        <p class="card-text" v-if="country.nextHoliday">
          Next Holiday: {{ country.nextHoliday.name }} ({{
            country.nextHoliday.date
          }})
        </p>
        <p class="card-text" v-else>No upcoming holidays found</p>
      </div>
    </div>
    <div v-else class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import { useHolidays } from '../composables/useHolidays'
import { CountryFromList, RandomCountry } from '../types'

const props = defineProps({
  countries: {
    type: Array as () => CountryFromList[],
    required: true,
  },
})
const { fetchNextHoliday, loading } = useHolidays()

const randomCountries: Ref<RandomCountry[]> = ref([])

const getRandomCountries = async (): Promise<void | RandomCountry[]> => {
  if (props.countries.length === 0) {
    console.log('no countries')
    return
  }

  const shuffled = [...props.countries].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 3)

  randomCountries.value = await Promise.all(
    selected.map(async (country: CountryFromList) => {
      const nextHoliday = await fetchNextHoliday(country.countryCode)
      return { ...country, nextHoliday }
    })
  )
}

onMounted(() => {
  getRandomCountries()
})
</script>
