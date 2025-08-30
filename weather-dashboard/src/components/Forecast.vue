<template>
  <div v-if="forecast && forecast.length" class="mt-6 p-6 bg-white rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">
      3-Day Weather Forecast
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div
          v-for="day in forecast"
          :key="day.date"
          class="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <p class="font-semibold text-gray-700 mb-2">
          {{ formatDate(day.date) }}
        </p>

        <div class="flex flex-col items-center mb-3">
          <img :src="day.day.condition.icon" alt="Weather icon" class="w-16 h-16 mb-2" />
          <p class="text-gray-800 font-medium">{{ day.day.condition.text }}</p>
        </div>

        <div class="flex justify-around mb-2 text-gray-700">
          <span class="text-sm">🌡️ Max: <b>{{ day.day.maxtemp_c }}°C</b></span>
          <span class="text-sm">❄️ Min: <b>{{ day.day.mintemp_c }}°C</b></span>
        </div>

        <!-- جزئیات بیشتر -->
        <div class="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
          <div class="flex items-center gap-1">💧 Humidity: {{ day.day.avghumidity }}%</div>
          <div class="flex items-center gap-1">🌬️ Wind: {{ day.day.maxwind_kph }} kph</div>
          <div class="flex items-center gap-1">🌧️ Rain: {{ day.day.daily_chance_of_rain }}%</div>
          <div class="flex items-center gap-1">🌡️ Feels: {{ day.day.avgtemp_c }}°C</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ forecast: any[] | null }>()

function formatDate(dateStr: string) {
  const options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" }
  return new Date(dateStr).toLocaleDateString("en-US", options)
}
</script>
