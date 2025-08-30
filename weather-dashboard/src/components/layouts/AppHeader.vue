<template>
  <header class="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
    <div class="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
      <h1 class="text-xl sm:text-2xl font-semibold">Weather Dashboard</h1>
      <div
          :class="online ? 'bg-emerald-500' : 'bg-red-500'"
          class="px-2 py-1 rounded-full text-white text-xs font-medium transition-colors"
      >
        {{ online ? 'آنلاین' : 'آفلاین' }}
      </div>
      <slot />
    </div>
  </header>
</template>
<script setup lang="ts">
import {useOnline} from "@vueuse/core";

const online = useOnline();
</script>
