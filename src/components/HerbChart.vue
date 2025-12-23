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

// Organic Tech - Emerald Color
const primaryColor = '#059669'; // emerald-600
const primaryColorDark = '#047857'; // emerald-700

const chartData = computed<ChartData<'bar'>>(() => {
  const sortedHerbs = [...props.herbs].sort((a, b) => b.totalValue - a.totalValue).slice(0, 10);

  return {
    labels: sortedHerbs.map(h => h.name),
    datasets: [{
      label: 'มูลค่า (บาท)',
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return primaryColor;
        }

        // Create gradient
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, primaryColorDark);
        return gradient;
      },
      borderRadius: 6,
      borderSkipped: false,
      data: sortedHerbs.map(h => h.totalValue),
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      maxBarThickness: 40,
    }],
  };
});

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0F172A',
      titleColor: '#FFFFFF',
      bodyColor: '#E2E8F0',
      titleFont: {
        family: '\'Prompt\', sans-serif',
        size: 13,
        weight: 'bold',
      },
      bodyFont: {
        family: '\'Prompt\', sans-serif',
        size: 12,
      },
      borderColor: '#334155',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      displayColors: false,
      callbacks: {
        title: items => items[0]?.label || '',
        label: ctx => `฿ ${new Intl.NumberFormat('th-TH').format(ctx.parsed.y ?? 0)}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#F1F5F9',
        lineWidth: 1,
      },
      ticks: {
        color: '#64748B',
        font: {
          family: '\'Prompt\', sans-serif',
          size: 11,
        },
        callback: (value) => {
          if (typeof value === 'number') {
            if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1)}M`;
            }
            if (value >= 1000) {
              return `${(value / 1000).toFixed(0)}K`;
            }
          }
          return value;
        },
      },
      border: { display: false },
    },
    x: {
      grid: { display: false },
      ticks: {
        color: '#64748B',
        font: {
          family: '\'Prompt\', sans-serif',
          size: 11,
        },
        autoSkip: false,
        maxRotation: 45,
        minRotation: 0,
      },
      border: { display: false },
    },
  },
  animation: {
    duration: 800,
    easing: 'easeOutQuart',
  },
};
</script>

<template>
  <div class="bg-surface p-6 rounded-2xl shadow-sm border border-border h-[500px] flex flex-col">
    <div class="mb-6 flex-none">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-bold text-text-primary text-lg tracking-tight">
            10 อันดับสมุนไพรที่มีมูลค่าจัดซื้อสูงสุด
          </h2>
          <p class="text-sm text-text-muted mt-1">
            แสดงข้อมูลเรียงลำดับตามมูลค่าการจัดซื้อ
          </p>
        </div>

        <div class="flex items-center gap-2 px-3 py-1 bg-primary-muted rounded-full border border-primary/10">
          <span class="w-2 h-2 rounded-full bg-primary" />
          <span class="text-xs font-semibold text-primary">มูลค่า (บาท)</span>
        </div>
      </div>
    </div>

    <div class="flex-1 w-full relative min-h-0">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
