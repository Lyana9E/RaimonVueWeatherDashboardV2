<template>
  <div class="mx-auto max-w-5xl p-4 space-y-6">
    <h1 class="text-2xl font-bold">شهرهای مورد علاقه</h1>

    <div v-if="!favorites.length" class="text-gray-500">
      هنوز هیچ شهری اضافه نکردی ⭐
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <WeatherCard
          v-for="city in favorites"
          :key="city"
          :loading="loadingCities[city]?.loading"
          :error="loadingCities[city]?.error"
          :city="loadingCities[city]?.data?.location?.name ?? city"
          :country="loadingCities[city]?.data?.location?.country"
          :temp="loadingCities[city]?.data?.current?.temp_c"
          :humidity="loadingCities[city]?.data?.current?.humidity"
          :wind-speed="loadingCities[city]?.data?.current?.wind_kph"
          :description="loadingCities[city]?.data?.current?.condition?.text"
          :is-favorite="true"
          @toggle-favorite="removeFavorite(city)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'
import { useWeatherApi } from '../composables/useWeatherApi'
import WeatherCard from '../components/WeatherCard.vue'

const weatherStore = useWeatherStore()
const { favorites, removeFavorite } = weatherStore

const loadingCities: Record<string, { loading: boolean; error: string | null; data: any | null }> = reactive({})

const { getCurrentWeather } = useWeatherApi()

onMounted(async () => {
  for (const city of favorites) {
    loadingCities[city] = { loading: true, error: null, data: null }
    try {
      await getCurrentWeather(city)
      const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&aqi=no&lang=fa`
      )
      if (!res.ok) throw new Error('خطا در دریافت اطلاعات')
      const data = await res.json()
      loadingCities[city].data = data
    } catch (err: any) {
      loadingCities[city].error = err.message
    } finally {
      loadingCities[city].loading = false
    }
  }
})
</script>
