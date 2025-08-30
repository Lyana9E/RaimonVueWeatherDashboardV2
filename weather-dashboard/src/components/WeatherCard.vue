<template>
  <aCard class="max-w-xl mx-auto">
    <template #title>
      <div class="flex items-center justify-between">
        <span>{{ title }}</span>
        <span v-if="city && country" class="text-sm text-gray-500">{{ city }} • {{ country }}</span>
        <aButton
            type="text"
            @click="$emit('toggle-favorite', city)"
            v-if="city"
        >
          {{ isFavorite ? "★" : "☆" }}
        </aButton>
      </div>
    </template>

    <div v-if="loading">
      <aSkeleton active :paragraph="{ rows: 3 }" />
    </div>

    <template v-else>
      <div v-if="error" class="space-y-2">
        <aAlert type="error" show-icon message="خطا در واکشی اطلاعات" :description="String(error)" />
      </div>

      <div v-else-if="temp !== null" class="space-y-2">
        <div class="text-5xl font-bold">{{ Math.round(temp) }}°</div>
        <div class="text-gray-600">
          {{ description }}
        </div>
        <div class="grid grid-cols-2 gap-3 pt-4 text-sm">
          <div class="p-3 rounded-xl bg-gray-50">
            حداکثر: <strong>--°</strong>
          </div>
          <div class="p-3 rounded-xl bg-gray-50">
            حداقل: <strong>--°</strong>
          </div>
          <div class="p-3 rounded-xl bg-gray-50">
            رطوبت: <strong>{{ humidity }}%</strong>
          </div>
          <div class="p-3 rounded-xl bg-gray-50">
            باد: <strong>{{ windSpeed }} km/h</strong>
          </div>
        </div>
      </div>

      <div v-else class="text-gray-500">ابتدا نام یک شهر را جستجو کنید</div>
    </template>
  </aCard>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  loading?: boolean
  error?: unknown
  title?: string
  city?: string | null
  country?: string | null
  temp?: number | null
  humidity?: number | null
  windSpeed?: number | null
  description?: string | null
  isFavorite?: boolean
}>(), {
  title: 'Current Weather',
  loading: false,
  error: null,
  city: null,
  country: null,
  temp: null,
  humidity: null,
  windSpeed: null,
  description: null,
  isFavorite: false,
})
</script>
