<template>
  <header class="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
    <div class="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
      <h1 class="text-xl sm:text-2xl font-semibold">Weather Dashboard</h1>
      <slot />
    </div>
  </header>
</template>
<script setup lang="ts"></script>
