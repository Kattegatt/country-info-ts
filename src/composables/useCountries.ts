import { ref } from 'vue';
import axios from 'axios';
import { Country, CountryFromList } from '../types';
const BASE = import.meta.env.VITE_API_BASE_URL;

export function useCountries() {
  const countries = ref<CountryFromList[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCountries = async () => {
    loading.value = true;
    try {
      const response = await axios.get<CountryFromList[]>(
        `${BASE}/AvailableCountries`
      );
      countries.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch countries';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchOneCountry = async (countryCode: string) => {
    loading.value = true;
    try {
      const response = await axios.get<Country>(
        `${BASE}/CountryInfo/${countryCode}`
      );
      return response.data;
    } catch (err) {
      error.value = 'Failed to fetch country';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { countries, loading, error, fetchCountries, fetchOneCountry };
}
