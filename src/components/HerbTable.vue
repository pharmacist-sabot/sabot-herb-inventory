<script setup lang="ts">
import type { HerbItem } from '@/services/herbs-service';

defineProps<{
  herbs: HerbItem[];
}>();

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(value);
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-muse flex flex-col h-[500px] overflow-hidden">
    <!-- Header Section -->
    <div class="p-6 pb-4 flex-none border-b border-gray-50 z-20 bg-white">
      <h6 class="font-bold text-slate-700">
        รายละเอียดรายการยาทั้งหมด
      </h6>
      <div class="flex items-center gap-2 mt-1">
        <span class="w-2 h-2 rounded-full bg-green-500" />
        <p class="text-sm text-slate-400">
          รายการจัดซื้อจริง
        </p>
      </div>
    </div>

    <!-- Table Content with Scroll -->
    <div class="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      <table class="w-full text-left border-collapse">
        <thead class="sticky top-0 z-10 bg-white shadow-sm">
          <tr>
            <th
              class="px-4 py-3 text-xs font-bold text-slate-400 uppercase bg-gray-50/50 border-b border-gray-100 w-14 text-center"
            >
              ลำดับ
            </th>
            <th class="px-4 py-3 text-xs font-bold text-slate-400 uppercase bg-gray-50/50 border-b border-gray-100">
              ชื่อยาสมุนไพร
            </th>
            <th
              class="px-4 py-3 text-xs font-bold text-slate-400 uppercase bg-gray-50/50 border-b border-gray-100 text-right min-w-[120px]"
            >
              มูลค่ารวม
            </th>
          </tr>
        </thead>
        <tbody class="text-slate-600 text-sm">
          <tr
            v-for="(herb, index) in herbs" :key="herb.name"
            class="hover:bg-gray-50 transition-colors last:border-b-0 border-b border-gray-100"
          >
            <td class="px-4 py-3 text-slate-400 text-center">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-3 font-semibold text-slate-700">
              {{ herb.name }}
            </td>
            <td class="px-4 py-3 font-bold text-slate-700 text-right">
              {{ formatCurrency(herb.totalValue) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
