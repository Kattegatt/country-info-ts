import { ref } from 'vue';
import axios from 'axios';
import { Holiday } from '../types';

export function useHolidays() {
  const holidays = ref<Holiday[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchHolidays = async (countryCode: string, year: number) => {
    loading.value = true;
    try {
      const response = await axios.get<Holiday[]>(
        `${import.meta.env.VITE_API_BASE_URL}/PublicHolidays/${year}/${countryCode}`
      );
      holidays.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch holidays';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchNextHoliday = async (countryCode: string) => {
    loading.value = true;
    try {
      const response = await axios.get<Holiday[]>(
        `${import.meta.env.VITE_API_BASE_URL}/NextPublicHolidays/${countryCode}`
      );
      return response.data[0]; // Return the next holiday
    } catch (err) {
      error.value = 'Failed to fetch next holiday';
      console.error(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { holidays, loading, error, fetchHolidays, fetchNextHoliday };
}
