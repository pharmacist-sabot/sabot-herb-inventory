<template>
    <div class="content-section">
        <h2>กราฟแสดงมูลค่ายาสมุนไพร</h2>
        <div class="chart-container">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
    herbs: {
        type: Array,
        required: true
    }
});

const chartData = computed(() => {
    const labels = props.herbs.map(h => h.name);
    const data = props.herbs.map(h => h.totalValue);

    return {
        labels: labels,
        datasets: [
            {
                label: 'มูลค่า (บาท)',
                backgroundColor: '#26a69a', /* var(--accent-color) */
                borderColor: '#e0f2f1',     /* var(--primary-color) */
                borderWidth: 1,
                data: data
            }
        ]
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function (value) {
                    return new Intl.NumberFormat('th-TH').format(value);
                }
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(context.parsed.y);
                    }
                    return label;
                }
            }
        }
    }
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
