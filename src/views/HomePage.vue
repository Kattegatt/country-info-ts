<template>
  <div class="container mt-4">
    <h1>Country Info</h1>
    <div class="row">
      <div class="col-md-6">
        <CountrySearch v-if="countries.length > 0" :countries="countries" />
      </div>
      <div class="col-md-6">
        <RandomCountriesWidget
          v-if="countries.length > 0"
          :countries="countries"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import CountrySearch from '../components/CountrySearch.vue';
import RandomCountriesWidget from '../components/RandomCountriesWidget.vue';
import { useCountries } from '../composables/useCountries';

const { countries, fetchCountries } = useCountries();

onBeforeMount(async () => {
  await fetchCountries();
});
</script>
