<template>
    <div class="content-section">
        <h2>ตารางแสดงรายละเอียด</h2>
        <table>
            <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อยาสมุนไพร</th>
                    <th>มูลค่ารวม</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(herb, index) in herbs" :key="herb.name">
                    <td>{{ index + 1 }}</td>
                    <td>{{ herb.name }}</td>
                    <td>{{ formatCurrency(herb.totalValue) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    herbs: {
        type: Array,
        required: true
    }
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(value);
};
</script>
