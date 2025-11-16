<template>
    <div class="summary-section">
        <div class="summary-card">
            <h3>มูลค่ารวมทั้งหมด (ปี {{ summary.year }})</h3>
            <p>{{ formatCurrency(summary.grandTotal) }}</p>
        </div>
        <div class="summary-card">
            <h3>จำนวนชนิดของยา</h3>
            <p>{{ summary.herbs.length }} ชนิด</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    summary: {
        type: Object,
        required: true
    }
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(value);
};
</script>
