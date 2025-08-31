<template>
  <div class="mx-auto max-w-5xl">

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

      <div v-if="currentWeather" class="mt-4 text-center">
        <p class="text-gray-600">
          last update: <span class="font-bold">{{ lastUpdatedDateTime }}</span>
        </p>
      </div>


      <Forecast v-if="forecastWeather" :forecast="forecastWeather" />

    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SearchBox from '../components/SearchBox.vue'
import WeatherCard from '../components/WeatherCard.vue'
import Forecast from "../components/Forecast.vue"
import { useWeatherApi } from '../composables/useWeatherApi'
import { useWeatherStore } from '../stores/weatherStore'




const { currentWeather, forecastWeather, loading, error, getCurrentWeather, getForecastWeather } = useWeatherApi()

const weatherStore = useWeatherStore()

const handleSearch = (q: string) => {
  if (q.trim()) {
    getCurrentWeather(q.trim())
    getForecastWeather(q.trim(), 3)
  }
}


const lastUpdatedDateTime = computed(() => {
  if (currentWeather.value?.current?.last_updated_epoch) {
    const timestamp = currentWeather.value.current.last_updated_epoch * 1000
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }
  return ''
})

const toggleFavorite = (cityName: string | null) => {
  if (!cityName) return
  if (weatherStore.favorites.includes(cityName)) {
    weatherStore.removeFavorite(cityName)
  } else {
    weatherStore.addFavorite(cityName)
  }
}
</script>


