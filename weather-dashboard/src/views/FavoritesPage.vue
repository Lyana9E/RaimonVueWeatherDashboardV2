<template>
  <div class="mx-auto max-w-5xl p-4 space-y-6">
    <h1 class="text-2xl font-bold">شهرهای مورد علاقه</h1>

    <div v-if="!favorites.length" class="text-gray-500">
      هنوز هیچ شهری اضافه نکردی ⭐
    </div>

    <div v-else class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <WeatherCard
          v-for="city in favorites"
          :key="city"
          :loading="favoriteCitiesData[city]?.loading"
          :error="favoriteCitiesData[city]?.error"
          :city="favoriteCitiesData[city]?.data?.location?.name ?? city"
          :country="favoriteCitiesData[city]?.data?.location?.country"
          :temp="favoriteCitiesData[city]?.data?.current?.temp_c"
          :humidity="favoriteCitiesData[city]?.data?.current?.humidity"
          :wind-speed="favoriteCitiesData[city]?.data?.current?.wind_kph"
          :description="favoriteCitiesData[city]?.data?.current?.condition?.text"
          :is-favorite="true"
          @toggle-favorite="removeFavorite(city)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'
import WeatherCard from '../components/WeatherCard.vue'

const weatherStore = useWeatherStore()
const { favorites, favoriteCitiesData, removeFavorite, loadAllFavoriteCities } = weatherStore

onMounted(()=>{
  loadAllFavoriteCities()
})
</script>
