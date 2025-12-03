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

<script setup lang="ts">
import type { HerbSummary } from "@/services/herbsService";

// Define Props with Types
defineProps<{
    summary: HerbSummary;
}>();

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
    }).format(value);
};
</script>

<style scoped>
/* Styles remain the same, relying on global CSS or scoped if preferred */
</style>
