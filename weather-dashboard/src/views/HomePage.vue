<template>
  <div class="mx-auto max-w-5xl">
    <AppHeader />

    <main class="px-4 py-8 space-y-8">
      <SearchBox
          placeholder="نام شهر را وارد کنید (مثلاً: Toronto)"
          @search="handleSearch"
      />

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
import AppHeader from '../components/layouts/AppHeader.vue'
import SearchBox from '../components/SearchBox.vue'
import WeatherCard from '../components/WeatherCard.vue'
import { useWeatherApi } from '../composables/useWeatherApi'
import { useWeatherStore } from '../stores/weatherStore'


const { currentWeather, loading, error, getCurrentWeather } = useWeatherApi()

const weatherStore = useWeatherStore()

const handleSearch = (q: string) => {
  if (q.trim()) {
    getCurrentWeather(q.trim())
  }
}

const toggleFavorite = (cityName: string | null) => {
  if (!cityName) return
  if (weatherStore.favorites.includes(cityName)) {
    weatherStore.removeFavorite(cityName)
  } else {
    weatherStore.addFavorite(cityName)
  }
}
</script>


