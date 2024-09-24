<template>
  <div class="year-selector">
    <div class="row">
      <div class="btn-group">
        <button
          v-for="year in years"
          :key="year"
          @click="changeYear(year)"
          class="btn btn-outline-dark me-2"
          :class="{ active: year === selectedYear }"
        >
          {{ year }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getYearParam } from '../utils/params'

const route = useRoute()
const router = useRouter()

const selectedYear = ref(
  parseInt(getYearParam(route)) || new Date().getFullYear()
)
const windowWidth = ref(window.innerWidth)

defineProps({
  selectedYear: Number,
})

const years = computed((): number[] => {
  const BUTTON_WIDTH = 75
  const buttonsFits =
    Math.round(windowWidth.value / BUTTON_WIDTH) % 2 === 0
      ? Math.round(windowWidth.value / BUTTON_WIDTH) - 1
      : Math.round(windowWidth.value / BUTTON_WIDTH)
  const currentYear = parseInt(getYearParam(route)) || new Date().getFullYear()

  return Array.from({ length: buttonsFits }, (_, i) =>
    Math.round(currentYear - buttonsFits / 2 + i)
  )
})

const changeYear = (year: number) => {
  router.push({
    name: 'Country',
    params: { ...route.params, year: year.toString() },
  })
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

const updateWindowWidth = () => (windowWidth.value = window.innerWidth)
</script>

<style scoped>
.year-selector {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.4);
  z-index: 10;
  overflow: hidden;
  align-items: center;
}
</style>
