<script setup lang="ts">
import type { HerbSummary } from '@/services/herbs-service';

defineProps<{
  summary: HerbSummary;
}>();

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('th-TH').format(value);
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <!-- Card 1: Total Value -->
    <div class="bg-white rounded-2xl p-4 shadow-muse flex justify-between items-center relative overflow-hidden">
      <div>
        <p class="text-sm text-slate-400 font-semibold mb-1">
          มูลค่ารวม (บาท)
        </p>
        <h4 class="text-xl font-bold text-slate-700">
          {{ formatCurrency(summary.grandTotal) }}
        </h4>
      </div>
      <div class="w-12 h-12 bg-primary rounded-lg shadow-lg flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Card 2: Total Items -->
    <div class="bg-white rounded-2xl p-4 shadow-muse flex justify-between items-center">
      <div>
        <p class="text-sm text-slate-400 font-semibold mb-1">
          จำนวนรายการยา
        </p>
        <h4 class="text-xl font-bold text-slate-700">
          {{ summary.herbs.length }} <span
            class="text-sm font-normal"
          >ชนิด</span>
        </h4>
        <p class="text-xs text-slate-400 mt-1">
          รายการที่มีการสั่งซื้อ
        </p>
      </div>
      <div class="w-12 h-12 bg-secondary rounded-lg shadow-lg flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
    </div>

    <!-- Card 3: System Status  -->
    <div class="bg-white rounded-2xl p-4 shadow-muse flex justify-between items-center">
      <div>
        <p class="text-sm text-slate-400 font-semibold mb-1">
          สถานะระบบ
        </p>
        <h4 class="text-xl font-bold text-slate-700">
          Online
        </h4>
        <p class="text-xs text-green-500 font-bold mt-1">
          เชื่อมต่อแล้ว
        </p>
      </div>
      <div class="w-12 h-12 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
