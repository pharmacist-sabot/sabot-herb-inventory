<script setup lang="ts">
import { ref } from 'vue';

const sidebarOpen = ref(false);
</script>

<template>
  <div class="min-h-screen flex bg-gray-50 font-sans text-slate-600 relative">
    <div
      v-if="sidebarOpen" class="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm transition-opacity"
      @click="sidebarOpen = false"
    />

    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 m-4 h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-muse transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-4 md:mr-0 shrink-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-[120%] md:translate-x-0'"
    >
      <div class="h-full flex flex-col p-4">
        <div class="flex items-center gap-3 px-2 mb-6 mt-2">
          <span class="font-bold text-lg text-slate-800 tracking-wide">Herbal Purchase Value</span>
        </div>

        <hr class="border-transparent bg-linear-to-r from-transparent via-gray-200 to-transparent h-px mb-6 mx-2">

        <nav
          class="flex-1 space-y-1 overflow-y-auto scrollbar-none"
          aria-label="Main Navigation"
        >
          <a
            href="#"
            class="flex items-center gap-4 px-4 py-3 bg-white shadow-muse-sm rounded-xl transition-all hover:shadow-md group"
          >
            <div class="p-2 bg-primary rounded-lg shadow-sm text-white group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <span class="font-semibold text-sm text-slate-700">Dashboard</span>
          </a>
        </nav>

        <div class="mt-4 p-4 bg-primary text-white rounded-xl shadow-muse relative overflow-hidden shrink-0">
          <div class="relative z-10">
            <h6 class="font-bold mb-1 text-sm">
              โรงพยาบาลสระโบสถ์
            </h6>
            <p class="text-xs opacity-80">
              รายงานมูลค่าการซื้อยาสมุนไพร
            </p>
          </div>
          <div class="absolute -right-4 -top-4 w-16 h-16 bg-white opacity-20 rounded-full" />
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300">
      <header
        class="p-4 md:p-6 md:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-20"
      >
        <div>
          <nav
            class="flex items-center gap-2 text-slate-400 text-sm mb-1 font-medium"
            aria-label="Breadcrumb"
          >
            <span>Pages</span>
            <span class="text-slate-300">/</span>
            <span class="text-slate-800">Dashboard</span>
          </nav>
          <h1 class="font-bold text-lg text-slate-800">
            ภาพรวมการจัดซื้อ
          </h1>
        </div>

        <div
          class="flex items-center gap-3 w-full md:w-auto bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-white/50 md:border-none md:shadow-none md:bg-transparent"
        >
          <button
            class="md:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            @click="sidebarOpen = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div class="flex-1 md:flex-none">
            <slot name="controls" />
          </div>
        </div>
      </header>

      <!-- Content Slot Container -->
      <div class="flex-1 p-4 md:p-6">
        <slot />
      </div>

      <!-- Footer -->
      <footer class="px-6 pb-6 pt-2">
        <p class="text-center md:text-left text-slate-400 text-sm font-medium">
          © {{ new Date().getFullYear() }}, <span class="text-slate-500">Sabot Hospital Pharmacy Dept.</span>
        </p>
      </footer>
    </main>
  </div>
</template>
