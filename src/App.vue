<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { HerbSummary } from '@/services/herbs-service';

import HerbChart from '@/components/HerbChart.vue';
import HerbTable from '@/components/HerbTable.vue';
// Components
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import SummaryCards from '@/components/SummaryCards.vue';
import herbsService from '@/services/herbs-service';

// State
const selectedYear = ref<number>(new Date().getFullYear());
const summaryData = ref<HerbSummary | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const availableYears = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

async function fetchData() {
  loading.value = true;
  error.value = null;
  try {
    const data = await herbsService.getHerbSummary(selectedYear.value);
    summaryData.value = data;
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
    console.error(err);
  }
  finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <DashboardLayout>
    <template #controls>
      <label for="year-select" class="text-sm font-semibold text-slate-500 mr-2">เลือกปีที่ต้องการดู:</label>
      <div class="relative">
        <select
          id="year-select" v-model="selectedYear" class="appearance-none bg-transparent border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 pr-8 cursor-pointer font-bold"
          @change="fetchData"
        >
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </template>

    <!-- Main Content Body -->
    <div v-if="loading" class="flex flex-col items-center justify-center h-96 text-slate-400">
      <svg
        class="animate-spin h-10 w-10 mb-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <p>กำลังประมวลผลข้อมูล...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6 text-center shadow-sm">
      <p class="font-bold">
        เกิดข้อผิดพลาด
      </p>
      <p>{{ error }}</p>
      <button
        class="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-semibold transition-colors"
        @click="fetchData"
      >
        ลองใหม่อีกครั้ง
      </button>
    </div>

    <template v-else-if="summaryData">
      <SummaryCards :summary="summaryData" />

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div class="lg:col-span-3">
          <HerbChart :herbs="summaryData.herbs" />
        </div>
        <div class="lg:col-span-2">
          <HerbTable :herbs="summaryData.herbs" />
        </div>
      </div>
    </template>
  </DashboardLayout>
</template>
