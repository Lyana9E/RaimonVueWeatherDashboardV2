<template>
  <header class="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-white/40">
    <div class="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
      <h1 class="text-xl sm:text-2xl font-semibold text-sky-700">Weather Dashboard</h1>

      <nav class="flex-1 flex items-center justify-center gap-6">
        <RouterLink
            to="/"
            class="text-sm font-medium text-sky-700 hover:text-sky-600 transition-colors"
        >
          خانه
        </RouterLink>
        <RouterLink
            to="/favorites"
            class="text-sm font-medium text-sky-700 hover:text-sky-600 transition-colors"
        >
          علاقه‌مندی‌ها
        </RouterLink>
      </nav>

      <div class="flex items-center justify-end w-40">
        <div
            :class="[
            'px-3 py-2 rounded-full text-white text-xs font-semibold transition-colors',
            online ? 'bg-green-300' : 'bg-red-200'
          ]"
            aria-live="polite"
        >
          {{ online ? 'آنلاین' : 'آفلاین' }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useOnline } from "@vueuse/core";
import { RouterLink } from "vue-router";

const online = useOnline();
</script>