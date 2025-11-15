<template>
    <div class="dashboard">
        <div class="controls">
            <label for="year-selector">เลือกปีงบประมาณ:</label>
            <select id="year-selector" :value="store.selectedYear" @change="onYearChange($event.target.value)">
                <option v-for="year in store.availableYears" :key="year" :value="year">
                    {{ year + 543 }}
                </option>
            </select>
        </div>

        <div v-if="store.isLoading" class="loading-state">
            <p>กำลังโหลดข้อมูล...</p>
        </div>

        <div v-if="store.error" class="error-state">
            <p>เกิดข้อผิดพลาด: {{ store.error }}</p>
        </div>

        <div v-if="!store.isLoading && !store.error && store.data" class="content-grid">
            <SummaryCard title="มูลค่าการสั่งซื้อรวม" :value="store.totalValue"
                :subtitle="`สรุปข้อมูลปี พ.ศ. ${store.selectedYear + 543}`" />
            <HerbBarChart :herbData="store.herbSummary" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useHerbStore } from '@/stores/herbStore';
import SummaryCard from '@/components/SummaryCard.vue';
import HerbBarChart from '@/components/HerbBarChart.vue';

const store = useHerbStore();

const onYearChange = (newYear) => {
    store.changeYear(parseInt(newYear));
};

onMounted(() => {
    // โหลดข้อมูลสำหรับปีปัจจุบันเมื่อ component ถูกสร้าง
    store.fetchData(store.selectedYear);
});
</script>

<style scoped>
.dashboard {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.controls {
    background-color: var(--card-bg-color);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 1rem;
}

.controls label {
    font-weight: 600;
    color: var(--secondary-color);
}

.controls select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    font-family: 'Sarabun', sans-serif;
    font-size: 1rem;
}

.content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

.loading-state,
.error-state {
    text-align: center;
    padding: 3rem;
    background-color: var(--card-bg-color);
    border-radius: 8px;
}

.error-state {
    color: #d32f2f;
    font-weight: bold;
}
</style>
