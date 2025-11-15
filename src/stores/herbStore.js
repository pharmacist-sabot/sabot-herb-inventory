import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import herbsService from '../services/herbsService';

export const useHerbStore = defineStore('herb', () => {
  // State
  const data = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const selectedYear = ref(new Date().getFullYear());

  // Getters (Computed properties)
  const totalValue = computed(() => data.value?.totalValue || 0);
  const herbSummary = computed(() => data.value?.herbSummary || []);
  const availableYears = computed(() => data.value?.availableYears || []);

  // Actions
  async function fetchData(year) {
    isLoading.value = true;
    error.value = null;
    data.value = null;
    try {
      const result = await herbsService.getHerbDataByYear(year);
      data.value = result;
      // ถ้าเป็นครั้งแรกที่โหลดและยังไม่มีปีที่เลือก ให้ตั้งค่าปีล่าสุดที่มีข้อมูล
      if (availableYears.value.length > 0 && selectedYear.value === new Date().getFullYear() && !availableYears.value.includes(selectedYear.value)) {
        selectedYear.value = availableYears.value[0];
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  }

  function changeYear(newYear) {
    selectedYear.value = newYear;
    fetchData(newYear);
  }

  return {
    data,
    isLoading,
    error,
    selectedYear,
    totalValue,
    herbSummary,
    availableYears,
    fetchData,
    changeYear,
  };
});
