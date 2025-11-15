<template>
    <div class="chart-container">
        <Bar v-if="chartData.labels && chartData.labels.length" :data="chartData" :options="chartOptions" />
        <p v-else>ไม่มีข้อมูลสำหรับแสดงผลกราฟ</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
    herbData: {
        type: Array,
        required: true,
    },
});

const chartData = computed(() => {
    const top10Data = props.herbData.slice(0, 10); // แสดงแค่ 10 อันดับแรก
    return {
        labels: top10Data.map(item => item.name),
        datasets: [
            {
                label: 'มูลค่ารวม (บาท)',
                backgroundColor: '#007A7A',
                borderColor: '#005a5a',
                borderWidth: 1,
                data: top10Data.map(item => item.totalValue),
            },
        ],
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: '10 อันดับยาสมุนไพรที่มีมูลค่าการสั่งซื้อสูงสุด',
            font: {
                size: 16,
                family: 'Sarabun'
            }
        },
    },
    scales: {
        y: {
            ticks: {
                callback: function (value) {
                    return '฿' + new Intl.NumberFormat('en-US').format(value);
                }
            }
        }
    }
};
</script>

<style scoped>
.chart-container {
    background-color: var(--card-bg-color);
    padding: 20px;
    border-radius: 8px;
    box-shadow: var(--shadow);
    height: 500px;
    position: relative;
}
</style>
