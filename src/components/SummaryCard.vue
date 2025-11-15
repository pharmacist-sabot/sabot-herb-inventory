<template>
    <div class="summary-card">
        <div class="card-title">{{ title }}</div>
        <div class="card-value">{{ formattedValue }}</div>
        <div class="card-subtitle">{{ subtitle }}</div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: String,
    value: Number,
    subtitle: String,
});

const formattedValue = computed(() => {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2,
    }).format(props.value || 0);
});
</script>

<style scoped>
.summary-card {
    background-color: var(--card-bg-color);
    border-radius: 8px;
    padding: 24px;
    box-shadow: var(--shadow);
    text-align: center;
    border-left: 5px solid var(--primary-color);
}

.card-title {
    font-size: 1rem;
    color: #666;
    margin-bottom: 8px;
}

.card-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 8px;
}

.card-subtitle {
    font-size: 0.9rem;
    color: #888;
}
</style>
