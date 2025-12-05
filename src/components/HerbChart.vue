<!-- src/components/HerbChart.vue -->
<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';

import type { HerbItem } from '@/services/herbs-service';

const props = defineProps<{
  herbs: HerbItem[];
}>();

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = computed<ChartData<'bar'>>(() => {
  const sortedHerbs = [...props.herbs].sort((a, b) => b.totalValue - a.totalValue).slice(0, 10);

  return {
    labels: sortedHerbs.map(h => h.name),
    datasets: [{
      label: 'มูลค่า (บาท)',
      backgroundColor: '#00796b',
      borderRadius: 6,
      data: sortedHerbs.map(h => h.totalValue),
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      maxBarThickness: 60,
    }],
  };
});

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#2d3748',
      bodyColor: '#2d3748',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: ctx => ` ${new Intl.NumberFormat('th-TH').format(ctx.parsed.y ?? 0)} บาท`,
      },
    },
  },
  scales: {
    y: {
      grid: { color: '#f1f5f9' },
      ticks: { color: '#94a3b8', font: { family: '\'Prompt\', sans-serif' } },
      border: { display: false },
    },
    x: {
      grid: { display: false },
      ticks: {
        color: '#94a3b8',
        font: { family: '\'Prompt\', sans-serif', size: 11 },
        autoSkip: false,
        maxRotation: 45,
        minRotation: 0,
      },
      border: { display: false },
    },
  },
};
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-muse h-[500px] flex flex-col">
    <div class="mb-4 flex-none">
      <h6 class="font-bold text-slate-700">
        10 อันดับสมุนไพรมูลค่าสูงสุด
      </h6>
      <p class="text-sm text-green-500 font-bold">
        <span class="text-slate-400 font-normal">แสดงข้อมูลเรียงลำดับตามมูลค่าจัดซื้อ</span>
      </p>
    </div>
    <div class="flex-1 w-full relative min-h-0">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
