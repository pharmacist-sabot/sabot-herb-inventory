<template>
    <header>
        <h1>รายงานมูลค่าซื้อยาสมุนไพร</h1>
        <h2>โรงพยาบาลสระโบสถ์</h2>
    </header>

    <main class="container">
        <div class="controls">
            <label for="year-select">เลือกปี:</label>
            <select id="year-select" v-model="selectedYear" @change="fetchData">
                <option
                    v-for="year in availableYears"
                    :key="year"
                    :value="year"
                >
                    {{ year }}
                </option>
            </select>
        </div>

        <div v-if="loading" class="content-section">
            <p>กำลังโหลดข้อมูล...</p>
        </div>

        <div v-else-if="error" class="content-section">
            <p style="color: red">เกิดข้อผิดพลาด: {{ error }}</p>
        </div>

        <template v-else-if="summaryData">
            <!-- Props are now type-checked -->
            <SummaryCards :summary="summaryData" />
            <HerbChart :herbs="summaryData.herbs" />
            <HerbTable :herbs="summaryData.herbs" />
        </template>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import herbsService, { type HerbSummary } from "@/services/herbsService";
import SummaryCards from "@/components/SummaryCards.vue";
import HerbChart from "@/components/HerbChart.vue";
import HerbTable from "@/components/HerbTable.vue";
import "@/assets/main.css";

// Typed Refs
const selectedYear = ref<number>(new Date().getFullYear());
const summaryData = ref<HerbSummary | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const availableYears = ref<number[]>([]);
for (let i = 0; i < 5; i++) {
    availableYears.value.push(new Date().getFullYear() - i);
}

const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        // service return Promise<HerbSummary>
        const data = await herbsService.getHerbSummary(selectedYear.value);
        summaryData.value = data;
    } catch (err) {
        if (err instanceof Error) {
            error.value = err.message;
        } else {
            error.value = "An unexpected error occurred";
        }
        console.error(err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});
</script>

<!-- Style is managed globally via main.css import -->
