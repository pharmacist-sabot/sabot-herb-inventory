<template>
    <header>
        <h1>รายงานมูลค่าซื้อยาสมุนไพร</h1>
        <h2>โรงพยาบาลสระโบสถ์</h2>
    </header>

    <main class="container">
        <div class="controls">
            <label for="year-select">เลือกปี:</label>
            <select id="year-select" v-model="selectedYear" @change="fetchData">
                <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
            </select>
        </div>

        <div v-if="loading" class="content-section">
            <p>กำลังโหลดข้อมูล...</p>
        </div>

        <div v-else-if="error" class="content-section">
            <p style="color: red;">เกิดข้อผิดพลาด: {{ error }}</p>
        </div>

        <template v-else-if="summaryData">
            <SummaryCards :summary="summaryData" />
            <HerbChart :herbs="summaryData.herbs" />
            <HerbTable :herbs="summaryData.herbs" />
        </template>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import herbsService from './services/herbsService.js';
import SummaryCards from './components/SummaryCards.vue';
import HerbChart from './components/HerbChart.vue';
import HerbTable from './components/HerbTable.vue';
import './assets/main.css';

const selectedYear = ref(new Date().getFullYear());
const summaryData = ref(null);
const loading = ref(true);
const error = ref(null);

// สร้างลิสต์ปีให้เลือก ย้อนหลัง 5 ปี
const availableYears = ref([]);
for (let i = 0; i < 5; i++) {
    availableYears.value.push(new Date().getFullYear() - i);
}

const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const data = await herbsService.getHerbSummary(selectedYear.value);
        summaryData.value = data;
    } catch (err) {
        error.value = err.message;
        console.error(err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});
</script>

<style>
/* ส่วนนี้ให้ Vue จัดการ แต่เรา import main.css เข้ามาแล้ว */
</style>
