<template>
    <header class="app-header">
        <div>
            <h1>แดชบอร์ดมูลค่าการสั่งซื้อยาสมุนไพร</h1>
            <h2>โรงพยาบาลสระโบสถ์</h2>
        </div>
    </header>
</template>

<style scoped>
.app-header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--primary-color);
    color: var(--secondary-color);
}

.logo {
    width: 60px;
    height: 60px;
}

h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
}

h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--primary-color);
}
</style>
