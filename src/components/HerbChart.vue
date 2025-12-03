<template>
    <div class="content-section">
        <h2>กราฟแสดงมูลค่ายาสมุนไพร</h2>
        <div class="chart-container">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type ChartOptions,
    type ChartData,
} from "chart.js";
import type { HerbItem } from "@/services/herbsService";

// Register ChartJS components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
);

const props = defineProps<{
    herbs: HerbItem[];
}>();

// Strongly typed Computed Property
const chartData = computed<ChartData<"bar">>(() => {
    const labels = props.herbs.map((h) => h.name);
    const data = props.herbs.map((h) => h.totalValue);

    return {
        labels: labels,
        datasets: [
            {
                label: "มูลค่า (บาท)",
                backgroundColor: "#26a69a",
                borderColor: "#e0f2f1",
                borderWidth: 1,
                data: data,
            },
        ],
    };
});

// Strongly typed Options
const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function (value) {
                    return new Intl.NumberFormat("th-TH").format(Number(value));
                },
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || "";
                    if (label) {
                        label += ": ";
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat("th-TH", {
                            style: "currency",
                            currency: "THB",
                        }).format(context.parsed.y);
                    }
                    return label;
                },
            },
        },
    },
};
</script>

<style scoped>
.chart-container {
    position: relative;
    height: 400px;
    width: 100%;
}

@media (max-width: 768px) {
    .chart-container {
        height: 300px;
    }
}
</style>
