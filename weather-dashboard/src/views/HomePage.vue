<template>
  <div class="mx-auto max-w-5xl">
    <!-- هدر -->
    <AppHeader />

    <main class="px-4 py-8 space-y-8">
      <!-- جستجوی شهر -->
      <SearchBox
          placeholder="نام شهر را وارد کنید (مثلاً: Toronto)"
          @search="handleSearch"
      />

      <!-- کارت آب و هوا -->
      <WeatherCard
          :loading="loading"
          :error="error"
          :city="currentWeather?.location?.name ?? null"
          :country="currentWeather?.location?.country ?? null"
          :temp="currentWeather?.current?.temp_c ?? null"
          :humidity="currentWeather?.current?.humidity ?? null"
          :wind-speed="currentWeather?.current?.wind_kph ?? null"
          :description="currentWeather?.current?.condition?.text ?? null"
          :isFavorite="currentWeather?.location?.name ? weatherStore.favorites.includes(currentWeather.location.name) : false"
          @toggle-favorite="toggleFavorite"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../components/layouts/AppHeader.vue'
import SearchBox from '../components/SearchBox.vue'
import WeatherCard from '../components/WeatherCard.vue'
import { useWeatherApi } from '../composables/useWeatherApi'
import { useWeatherStore } from '../stores/weatherStore'

// reactive city
const city = ref('')

// composable آب و هوا
const { currentWeather, loading, error, getCurrentWeather } = useWeatherApi()

// Pinia store
const weatherStore = useWeatherStore()

// تابع جستجو
const handleSearch = (q: string) => {
  if (q.trim()) {
    getCurrentWeather(q.trim())
  }
}

// toggle favorite
const toggleFavorite = (cityName: string | null) => {
  if (!cityName) return
  if (weatherStore.favorites.includes(cityName)) {
    weatherStore.removeFavorite(cityName)
  } else {
    weatherStore.addFavorite(cityName)
  }
}
</script>


